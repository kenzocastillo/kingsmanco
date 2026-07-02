"use server";

import Link from "next/link";

import { getCart } from "../src/features/cart/actions";

import CartItem from "../src/features/cart/components/CartItem";
import CartSummary from "../src/features/cart/components/CartSummary";

export default async function Page() {
  const cart = await getCart();

  // ================= EMPTY STATE =================
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center text-black">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Your Cart is Empty
        </h1>

        <p className="mt-4 max-w-md text-sm tracking-wide text-gray-400">
          Nothing here yet. Discover pieces designed with intention and built
          for presence.
        </p>

        <Link
          href="/products"
          className="mt-10 bg-black px-10 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
        >
          Enter Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-20 text-black">
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <section className="flex flex-col gap-12">
          <div>
            <h1 className="text-4xl font-medium tracking-tight">Cart</h1>

            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-400">
              Review Your Selection
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </section>

        {/* RIGHT */}
        <CartSummary cartItems={cart.items} />
      </div>
    </div>
  );
}
