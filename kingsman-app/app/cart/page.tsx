"use server";

import Image from "next/image";
import { getCart } from "../src/features/cart/actions";
import CheckoutButton from "../src/features/cart/components/CheckoutButton";

export default async function Page() {
  const cart = await getCart();

  // ================= EMPTY STATE =================
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-gray-400 text-sm tracking-wide max-w-md">
          Nothing here yet. Discover pieces designed with intention and built
          for presence.
        </p>

        <a
          href="/products"
          className="mt-10 inline-block bg-black text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition"
        >
          Enter Shop
        </a>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_1fr] gap-20">
        {/* LEFT - ITEMS */}
        <div className="flex flex-col gap-12">
          {/* TITLE */}
          <div>
            <h1 className="text-4xl font-medium tracking-tight">Cart</h1>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mt-2">
              Review Your Selection
            </p>
          </div>

          {/* ITEMS */}
          <div className="flex flex-col gap-10">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 items-center border-b border-gray-200 pb-8"
              >
                {/* IMAGE */}
                <div className="w-20 h-24 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.product.image || ""}
                    alt={item.product.name}
                    width="150"
                    height="150"
                    className="w-full h-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-1 justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm tracking-wide">{item.product.name}</p>
                    <p className="text-xs text-gray-400 tracking-widest uppercase">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm tracking-wide">
                    ₱{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="sticky top-24 h-fit border border-gray-200 p-10 flex flex-col gap-8">
          <h2 className="text-sm tracking-[0.3em] uppercase">Summary</h2>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{total}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between text-sm">
            <span>Total</span>
            <span className="font-medium tracking-wide">₱{total}</span>
          </div>

          <CheckoutButton cartItems={cart.items} />

          <p className="text-xs text-gray-400 tracking-wide text-center">
            Taxes and shipping calculated at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
