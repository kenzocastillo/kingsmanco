"use server";
import prisma from "@/lib/prisma";

export const loadProducts = async (cursor?: string, limit: number = 10) => {
  const products = await prisma.product.findMany({
    take: limit + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
    orderBy: { id: "asc" },
  });

  const hasNextPage = products.length > limit;
  if (hasNextPage) products.pop();

  return {
    products,
    nextCursor: hasNextPage ? products[products.length - 1].id : null,
  };
};
