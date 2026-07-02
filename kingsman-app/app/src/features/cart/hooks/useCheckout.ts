"use client";

import { useState } from "react";
import type { CartItem } from "@/app/types/types";
import { handleCheckout } from "../../payment/action";

export const useCheckout = (cartItems: CartItem[]) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const products = cartItems.map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));
      const url = await handleCheckout(products);
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return { handleClick, loading };
};
