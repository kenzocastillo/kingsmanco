"use client";
import Image from "next/image";

import Link from "next/link";
import { useInfiniteOrders } from "../hooks/useInfiniteOrders";
export default function OrdersList({ userId }: { userId: string }) {
  const { orders, bottomRef, loading, hasMore } = useInfiniteOrders(userId);
  return (
    <div className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">
        {/* PAGE TITLE */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
            Orders
          </h1>
          <p className="text-xs tracking-widest text-gray-400 mt-3 uppercase">
            Purchase History
          </p>
        </div>
        {/* ORDERS */}
        {orders.map((order, i) => {
          const total = order.orderItems.reduce(
            (acc, item) => item.price * item.quantity + acc,
            0,
          );
          return (
            <Link className="block" key={order.id} href={`/orders/${order.id}`}>
              <div className="flex flex-col gap-10 border-t border-gray-200 pt-10">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
                    Order {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-xs tracking-[0.3em] uppercase">
                    {order.status}
                  </p>
                </div>
                {/* ITEMS */}
                <div className="flex flex-col gap-8">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-6 group"
                    >
                      {/* IMAGE */}
                      <div className="relative w-16 h-20 bg-gray-100 overflow-hidden">
                        <Image
                          fill
                          src={item.product.image ?? ""}
                          alt={item.product.name}
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      {/* INFO */}
                      <div className="flex flex-1 justify-between items-center">
                        <div className="flex flex-col">
                          <p className="text-sm tracking-wide">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-400 tracking-widest uppercase">
                            Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm tracking-wide">
                          ₱{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* TOTAL */}
                <div className="flex justify-end border-t border-gray-200 pt-6">
                  <p className="text-sm tracking-wide">
                    Total —
                    <span className="font-medium tracking-wide">₱{total}</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
        {/* LOADER */}
        <div ref={bottomRef} className="h-16 flex items-center justify-center">
          {loading && (
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 animate-pulse">
              Loading
            </p>
          )}
          {!hasMore && orders.length > 0 && (
            <p className="text-xs tracking-[0.3em] uppercase text-gray-300">
              End of Orders
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
