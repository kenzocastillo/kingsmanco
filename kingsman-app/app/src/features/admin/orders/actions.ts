import prisma from "@/lib/prisma";
import { OrderStatus } from "../../../../generated/prisma/enums";
export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: { user: true, orderItems: { include: { product: true } } },
  });
  return orders;
};

export const updateOrder = async (id: string, status: OrderStatus) => {
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: {
      status: status,
    },
  });

  return updatedOrder;
};
