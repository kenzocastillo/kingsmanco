import { loadOrders } from "../actions";

export type OrderWithItems = Awaited<
  ReturnType<typeof loadOrders>
>["orders"][number];
