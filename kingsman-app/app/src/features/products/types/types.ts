import { loadProducts } from "../actions";

export type ProductWithItems = Awaited<
  ReturnType<typeof loadProducts>
>["products"][number];
