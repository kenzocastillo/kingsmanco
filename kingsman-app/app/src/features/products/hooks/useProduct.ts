import { useCallback, useEffect, useRef, useState } from "react";
import { loadProducts } from "../actions";
import { ProductWithItems } from "../types/types";

export const useProduct = () => {
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

  return {
    bottomRef,
    products,
    loading,
    hasMore,
  };
};
