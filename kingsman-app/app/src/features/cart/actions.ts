"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "../auth/helpers";

// ======================================================
// ADD TO CART
// ======================================================

export const addToCart = async (productId: string, quantity: number = 1) => {
  const userId = await getUserId();

  const cart = await prisma.cart.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      userId,
    },
  });

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.userId,
      productId,
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.userId,
        productId,
        quantity,
      },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");
};

// ======================================================
// GET CART
// ======================================================

export const getCart = async () => {
  const userId = await getUserId();

  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

// ======================================================
// INCREASE QUANTITY
// ======================================================

export const increaseQuantity = async (cartItemId: string) => {
  await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });

  revalidatePath("/cart");
  revalidatePath("/", "layout");
};

// ======================================================
// DECREASE QUANTITY
// ======================================================

export const decreaseQuantity = async (cartItemId: string) => {
  const item = await prisma.cartItem.findUnique({
    where: {
      id: cartItemId,
    },
  });

  if (!item) return;

  if (item.quantity <= 1) {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  } else {
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");
};

// ======================================================
// REMOVE ITEM
// ======================================================

export const removeCartItem = async (cartItemId: string) => {
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  revalidatePath("/cart");
  revalidatePath("/", "layout");
};

// ======================================================
// CLEAR CART
// ======================================================

export const clearCart = async () => {
  const userId = await getUserId();

  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.userId,
    },
  });

  revalidatePath("/cart");
  revalidatePath("/", "layout");
};
