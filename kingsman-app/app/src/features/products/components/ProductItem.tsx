"use client";

import { ProductProps } from "@/app/types/types";
import Image from "next/image";
import { useProductItem } from "../hooks/useProductItem";

const ProductItem = ({ product }: ProductProps) => {
  const { handleAddToCart, isAdded } = useProductItem(product);
  return (
    <div className="group flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.image ?? ""}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

        {/* Button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={product.quantity < 1 || isAdded}
            className={`w-full py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300
              ${
                product.quantity < 1
                  ? "cursor-not-allowed bg-neutral-300 text-neutral-500 line-through"
                  : isAdded
                    ? "bg-amber-600 text-white"
                    : "bg-black text-white"
              }`}
          >
            {product.quantity < 1
              ? "Sold Out"
              : isAdded
                ? "✓ Added"
                : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <p className="text-sm uppercase tracking-[0.15em] text-neutral-900">
          {product.name}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium tracking-wide">${product.price}</p>

          <span
            className={`text-xs uppercase tracking-[0.15em] ${
              product.quantity > 0
                ? "text-neutral-400"
                : "text-neutral-300 line-through"
            }`}
          >
            {product.quantity > 0 ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
