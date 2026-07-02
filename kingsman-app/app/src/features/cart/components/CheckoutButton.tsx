"use client";

import { useCheckout } from "../hooks/useCheckout";
import type { CartItem } from "@/app/types/types";

type CheckoutButtonProps = {
  cartItems: CartItem[];
};

const CheckoutButton = ({ cartItems }: CheckoutButtonProps) => {
  const { handleClick, loading } = useCheckout(cartItems);

  return (
    <button
      className="mt-4 bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
};

export default CheckoutButton;
