import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          }
        );

        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await prisma.user.findUnique({
            where: { email: customerDetails.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              isPremium: true,
            },
          });

          redirect("/");
        }

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response("Success", { status: 200 });
  } catch (error: any) {
    console.error("Error processing webhook:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 500 });
  }
}
