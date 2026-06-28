"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "../auth/helpers";

export const createOrder = async () => {
  const userId = await getUserId();

  // check if cart has items
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0)
    throw new Error("There are no Items in the Cart ");

  const orderCreate = await prisma.order.create({
    data: {
      userId,
      orderItems: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  // get orderItem, getProductId, Map inside, then reduce the product depending on quantity of OrderItem.
  const orderItem = await prisma.orderItem.findMany({
    where: { orderId: orderCreate.id },
    include: { product: true },
  });

  // loop through each order item ,
  for (const item of orderItem) {
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        quantity: {
          decrement: item.quantity,
        },
      },
    });
    console.log(item);
  }

  if (orderCreate) {
    await prisma.cartItem.deleteMany({
      where: { cartId: userId },
    });
    await prisma.cart.delete({
      where: { userId },
    });
  } else {
    throw new Error("Problem with creating order");
  }

  revalidatePath("/", "layout");
  revalidatePath("/products", "layout");
  redirect("/orders");
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
