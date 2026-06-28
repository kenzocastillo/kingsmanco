"use client";
import { CartItemProps } from "@/app/types/types";
import Image from "next/image";
import React from "react";
import { deleteCartItem } from "../actions";

const CartItem = ({ product, quantity, id }: CartItemProps) => {
  return (
    <div className="flex gap-5 flex-col justify-center items-center  h-100 p-5">
      <Image
        src={product.image ?? ""}
        alt={product.name}
        width={150}
        height={150}
      />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{quantity}</p>
      <span onClick={() => deleteCartItem(id)} className="cursor-pointer">
        Delete Item 🗑️
      </span>
    </div>
  );
};

export default CartItem;
