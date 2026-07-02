"use client";

import { useTransition } from "react";

import type { CartItem } from "@/app/types/types";

import CheckoutButton from "./CheckoutButton";
import { clearCart } from "../actions";

type CartSummaryProps = {
  cartItems: CartItem[];
};

const CartSummary = ({ cartItems }: CartSummaryProps) => {
  const [isPending, startTransition] = useTransition();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="sticky top-24 h-fit border border-gray-200 p-10 flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h2 className="text-sm tracking-[0.3em] uppercase">Summary</h2>
      </div>

      {/* Prices */}
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₱{subtotal}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <span className="text-sm">Total</span>

        <span className="font-medium tracking-wide">₱{subtotal}</span>
      </div>

      {/* Checkout */}
      <CheckoutButton cartItems={cartItems} />

      {/* Clear Cart */}
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const confirmed = window.confirm(
              "Remove all items from your cart?",
            );

            if (!confirmed) return;

            await clearCart();
          })
        }
        className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition disabled:opacity-40"
      >
        {isPending ? "Clearing..." : "Clear Cart"}
      </button>

      {/* Footer */}
      <p className="text-center text-xs tracking-wide text-gray-400">
        Taxes and shipping calculated at checkout.
      </p>
    </div>
  );
};

export default CartSummary;
