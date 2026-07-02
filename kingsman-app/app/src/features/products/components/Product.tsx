"use client";

import { useProduct } from "../hooks/useProduct";
import ProductItem from "./ProductItem";

export default function Product() {
  const { products, loading, hasMore, bottomRef } = useProduct();
  return (
    <div className="grid grid-cols-2 relative md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 px-4 md:px-10 py-10">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}

      <div
        ref={bottomRef}
        className="col-span-full h-16 flex items-center justify-center"
      >
        {loading && (
          <p className="text-xs tracking-widest uppercase text-gray-400 animate-pulse">
            Loading
          </p>
        )}

        {!hasMore && products.length > 0 && (
          <p className="text-xs tracking-widest uppercase text-gray-300">
            End of Collection
          </p>
        )}
      </div>
    </div>
  );
}
