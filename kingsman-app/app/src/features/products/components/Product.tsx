"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ProductItem from "./ProductItem";
import { loadProducts } from "../actions";

type ProductWithItems = Awaited<
  ReturnType<typeof loadProducts>
>["products"][number];

export default function Product() {
  const [products, setProducts] = useState<ProductWithItems[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);
  const loadingRef = useRef(false);

  const fetchMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    const { products: newProducts, nextCursor } = await loadProducts(cursor);

    setProducts((prev) => [...prev, ...newProducts]);
    setCursor(nextCursor ?? undefined);
    setHasMore(nextCursor !== null);
    loadingRef.current = false;
    setLoading(false);
  }, [cursor, hasMore]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchMore();
  }, [fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { threshold: 0.1 },
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchMore]);

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
