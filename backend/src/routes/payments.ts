import { Router, Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
  brand?: string;
  material?: string;
}
export type CartItemProduct = Omit<Product, "sizes" | "colors">;

interface CartItem {
  id: string;
  product: CartItemProduct;
  quantity: number;
  size?: string;
  color?: string;
}

/**
 * Creating a customer
 */
router.post("/create-customer", async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const customer = await stripe.customers.create({
    email,
    name,
  });

  res.json({ customerId: customer.id });
});

/**
 * Setup the card for a customer/user.
 */
router.post("/setup-intent", async (req: Request, res: Response) => {
  const { customerId } = req.body;

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
      usage: "off_session",
    });

    res.json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/saved-cards", async (req: Request, res: Response) => {
  const { customerId } = req.query;

  if (!customerId) {
    return res.json({ paymentMethods: [] });
  }

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId as string,
      type: "card",
    });

    const mapped = paymentMethods.data.map((pm) => ({
      id: pm.id,
      card: {
        brand: pm.card!.brand,
        last4: pm.card!.last4,
        exp_month: pm.card!.exp_month,
        exp_year: pm.card!.exp_year,
      },
    }));

    res.json({ paymentMethods: mapped });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/checkout", async (req: Request, res: Response) => {
  const { customerId, items, currency = "cad", email } = req.body;

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = Math.round(subtotal + shipping + tax);

  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    const paymentMethodId = paymentMethods.data[0]?.id;

    if (!paymentMethodId) {
      return res.status(400).json({ error: "No saved card found." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency,
      customer: customerId,
      payment_method: paymentMethodId,
      receipt_email: email,
      confirm: true, 
      off_session: true, 
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json({ success: true, paymentIntentId: paymentIntent.id });
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
