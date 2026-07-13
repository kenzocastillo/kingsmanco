"use server";

import { getAllOrders } from "@/app/src/features/admin/orders/actions";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="min-h-screen bg-white px-6 py-20 text-black">
      <div className="mx-auto max-w-5xl flex flex-col gap-20">
        {/* PAGE HEADER */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
            Admin Orders
          </h1>

          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gray-400">
            Order Management
          </p>
        </div>

        {/* ORDERS */}
        <div className="flex flex-col gap-16">
          {orders.map((order, index) => {
            const total = order.orderItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );

            return (
              <div
                key={order.id}
                className="border-t border-gray-200 pt-10 flex flex-col gap-10"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Order {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2 className="mt-2 text-xl font-medium">
                      {order.user.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      {order.user.email}
                    </p>

                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Status
                    </p>

                    <p className="mt-2 text-sm tracking-wide">{order.status}</p>

                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gray-400">
                      Total
                    </p>

                    <p className="mt-2 text-lg font-medium">
                      ₱{total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="flex flex-col gap-6">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-100 pb-4"
                    >
                      <div>
                        <p className="text-sm tracking-wide">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gray-400">
                          Qty {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                  <button className="border border-black px-6 py-3 text-xs uppercase tracking-[0.25em] transition hover:bg-black hover:text-white">
                    Mark Paid
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
