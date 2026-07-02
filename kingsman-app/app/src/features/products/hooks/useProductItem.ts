import { Product } from "@/app/types/types";
import { addToCart } from "../../cart/actions";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export const useProductItem = (product: Product) => {
  const [isAdded, setIsAdded] = useState(false);
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    if (!session) {
      await signIn("google", {
        callbackUrl: "/products",
      });
      return;
    }

    if (isAdded || product.quantity < 1) return;

    await addToCart(product.id);

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return { handleAddToCart, isAdded };
};
