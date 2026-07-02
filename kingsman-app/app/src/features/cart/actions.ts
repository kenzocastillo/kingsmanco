"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "../auth/helpers";

// when add to cart is clicked
export const addToCart = async (productId: string, quantity: number = 1) => {
  const userId = await getUserId();

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  // Check if item being add to cart already exists in the cart, if exists , add quantity only, if not, create a new cartItem.
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      id: userId,
    },
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity },
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

  // redirect to home and refresh cart data in Navbar since it exists in Layout
  revalidatePath("/", "layout");
};

export const getCart = async () => {
  const userId = await getUserId();
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
        distinct: ["productId"],
      },
    },
  });
};

// delete cartItem
export const deleteCartItem = async (id: string) => {
  await prisma.cartItem.delete({
    where: {
      id,
    },
  });
  revalidatePath("/cart", "layout");
};
