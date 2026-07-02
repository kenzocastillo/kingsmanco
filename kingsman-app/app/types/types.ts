export type Product = {
  id: string;
  image: string | null;
  name: string;
  price: number;
  quantity: number;
};

export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type CheckoutButtonProps = {
  cartItems: CartItem[];
};

export type ProductProps = {
  product: Product;
};

export type CartButtonProps = {
  cartCount: number;
};

export type AddtoCartButtonProps = {
  product: Product;
};

export type CartItemProps = {
  product: Product;
  quantity: number;
  id: string;
};

export type OrderButtonProps = {
  cartItems: CartItem[];
};

export interface OrderItemProps {
  params: Promise<{ orderId: string }>;
}
