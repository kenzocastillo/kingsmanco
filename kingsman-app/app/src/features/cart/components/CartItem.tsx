"use client";

import Image from "next/image";
import { useTransition } from "react";

import type { CartItemProps } from "@/app/types/types";

import { increaseQuantity, decreaseQuantity, removeCartItem } from "../actions";

const CartItem = ({ id, product, quantity }: CartItemProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 pb-8">
      {/* IMAGE */}
      <div className="w-24 h-32 overflow-hidden bg-gray-100">
        <Image
          src={product.image ?? ""}
          alt={product.name}
          width={200}
          height={300}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm tracking-[0.15em] uppercase">
              {product.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">₱{product.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              disabled={isPending}
              onClick={() => startTransition(() => decreaseQuantity(id))}
              className="w-8 h-8 border border-gray-300 hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              −
            </button>

            <span className="w-6 text-center text-sm">{quantity}</span>

            <button
              disabled={isPending}
              onClick={() => startTransition(() => increaseQuantity(id))}
              className="w-8 h-8 border border-gray-300 hover:bg-black hover:text-white transition disabled:opacity-40"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            disabled={isPending}
            onClick={() => startTransition(() => removeCartItem(id))}
            className="w-fit text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-black transition disabled:opacity-40"
          >
            Remove
          </button>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-sm tracking-wide font-medium">
            ₱{product.price * quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
