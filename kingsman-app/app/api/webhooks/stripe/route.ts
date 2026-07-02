import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new Response("Missing orderId", { status: 400 });
    }

    try {
      // Update order status
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
        include: {
          orderItems: true,
        },
      });

      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Delete the cart once payment is OK
      await prisma.cartItem.deleteMany({
        where: { cart: { userId: order.userId } },
      });

      revalidatePath("/", "layout");
    } catch {
      return new Response("Database error", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
