import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/useRedux";
import Shipping from "@/components/checkout/Shipping";
import Payment from "@/components/checkout/Payment";
import OrdersPreview from "@/components/checkout/OrdersPreview";
import { useState } from "react";

export function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);

  const [hasShipped, setHasShipped] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);

  const canPlaceOrder = hasPayment && hasShipped && items.length > 0;

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

  return (
    <div className="container py-12 max-w-6xl">
      <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Address & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <Shipping setHasShipped={setHasShipped} />
          {/* Payment Method */}
          <Payment setHasPayment={setHasPayment} />
        </div>
        {/* Right Column - Order Summary */}
        <OrdersPreview canPlaceOrder={canPlaceOrder} />
      </div>
    </div>
  );
}
