"use client";

import { createOrder } from "../actions";

const OrderButton = () => {
  const onOrderButtonClick = () => {
    createOrder();
  };
  return (
    <button
      className="mt-4 bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-gray-800 transition"
      onClick={onOrderButtonClick}
    >
      Checkout
    </button>
  );
};

export default OrderButton;
