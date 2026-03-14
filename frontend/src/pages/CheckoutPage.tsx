import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks/useRedux";
import { useUser } from "@clerk/clerk-react"; // your auth
import Shipping from "@/components/checkout/Shipping";
import Payment from "@/components/checkout/Payment";
import OrdersPreview from "@/components/checkout/OrdersPreview";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import useUpdateCustomerId from "@/app/hooks/payment/useUpdateCustomerId";

export function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useUser();

  const [hasShipped, setHasShipped] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  const { mutate: updateCustomerId } = useUpdateCustomerId();

  const canPlaceOrder = hasPayment && hasShipped && items.length > 0;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = Math.round((subtotal + shipping + tax) * 100);

  useEffect(() => {
    if (items.length === 0 || isLoadingCustomerId) return; // wait for customerId to load first

    const initCheckout = async () => {
      const res = await fetch("http://localhost:5000/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          email: user?.emailAddresses[0].emailAddress,
          name: user?.fullName,
          amount: total,
          currency: "cad",
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);

      // If a new Stripe customer was created, save it to Supabase
      if (!customerId && data.customerId) {
        updateCustomerId(data.customerId);
      }
    };

    initCheckout();
  }, [isLoadingCustomerId]); // re-runs once customerId finishes loading

  if (items.length === 0) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add items to your cart before checking out
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="container py-12 max-w-6xl">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Shipping setHasShipped={setHasShipped} />
            <Payment
              setHasPayment={setHasPayment}
              customerId={customerId ?? null}
            />
          </div>
          <OrdersPreview canPlaceOrder={canPlaceOrder} />
        </div>
      </div>
    </Elements>
  );
}
