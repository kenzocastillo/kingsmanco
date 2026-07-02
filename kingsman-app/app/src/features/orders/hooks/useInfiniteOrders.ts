import { useCallback, useEffect, useRef, useState } from "react";
import { OrderWithItems } from "../types/types";
import { loadOrders } from "../actions";

export const useInfiniteOrders = (userId: string) => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
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

    const { orders: newOrders, nextCursor } = await loadOrders(userId, cursor);
    setOrders((prev) => [...prev, ...newOrders]);
    setCursor(nextCursor ?? undefined);
    setHasMore(nextCursor !== null);

    loadingRef.current = false;
    setLoading(false);
  }, [cursor, hasMore, userId]);

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
    orders,
    loading,
    bottomRef,
    hasMore,
  };
};
