import { Router, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post("/checkout", async (req: Request, res: Response) => {
  const { customerId, email, name, amount, currency = "cad" } = req.body;

  try {
    let stripeCustomerId: string = customerId;

    if (!customerId) {
      const customer = await stripe.customers.create({ email, name });
      stripeCustomerId = customer.id;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      customer: stripeCustomerId,
      receipt_email: email,
      setup_future_usage: "off_session",
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      customerId: stripeCustomerId,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/saved-cards", async (req: Request, res: Response) => {
  const customerId = req.query.customerId as string;

  if (!customerId) {
    return res.json({ paymentMethods: [] });
  }

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId as string,
      type: "card",
    });

    res.json({ paymentMethods: paymentMethods.data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/card", async (req: Request, res: Response) => {
  const { customerId, paymentMethodId } = req.body;

  try {
    await stripe.paymentMethods.detach(paymentMethodId);

    const remaining = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    const wasLastCard = remaining.data.length === 0;

    if (wasLastCard) {
      await stripe.customers.del(customerId);
    }

    res.json({ wasLastCard });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
