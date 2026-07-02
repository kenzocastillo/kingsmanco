"use server";
import { Product } from "@/app/types/types";
import Stripe from "stripe";

import { createOrder } from "../orders/actions";

export async function handleCheckout(cartItems: Product[]) {
  const order = await createOrder();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "php",
        product_data: { name: item.name },
        unit_amount: item.price * 1000,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/orders/${order.id}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: { orderId: order.id },
  });

  return session.url;
}
