"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "../auth/helpers";

export const createOrder = async () => {
  const userId = await getUserId();

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0)
    throw new Error("There are no Items in the Cart");

  const orderCreate = await prisma.order.create({
    data: {
      userId,
      status: "PENDING",
      orderItems: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  // Decrement product quantity
  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        quantity: { decrement: item.quantity },
      },
    });
  }

  return orderCreate;
};

export const loadOrder = async (orderId: string) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: { include: { product: true }, distinct: ["productId"] },
    },
  });
  return order;
};

export const loadOrders = async (
  id: string,
  cursor?: string,
  limit: number = 10,
) => {
  const orders = await prisma.order.findMany({
    where: { userId: id },
    include: {
      orderItems: { include: { product: true }, distinct: ["productId"] },
    },
    take: limit + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
    orderBy: { createdAt: "desc" },
  });

  const hasNextPage = orders.length > limit;
  if (hasNextPage) orders.pop();

  return {
    orders,
    nextCursor: hasNextPage ? orders[orders.length - 1].id : null,
  };
};
