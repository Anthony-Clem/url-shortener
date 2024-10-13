import { requireUser } from "@/app/lib/hooks";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type StripeError = {
  message: string;
  statusCode?: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const authSession = await requireUser();
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      automatic_tax: { enabled: true },
      customer_email: authSession?.user?.email as string,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    let error: StripeError = {
      message: "An unknown error occurred",
    };

    // Check if the error is a Stripe error
    if (err instanceof Stripe.errors.StripeError) {
      error = {
        message: err.message,
        statusCode: err.statusCode || 500,
      };
    }

    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
