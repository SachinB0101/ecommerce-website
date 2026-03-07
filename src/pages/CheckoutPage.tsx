import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/useRedux";
import Shipping from "@/components/checkout/Shipping";
import Payment from "@/components/checkout/Payment";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const canPlaceOrder = false;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    // if (!canPlaceOrder) return;
    setIsProcessing(true);
    setIsProcessing(false);
    navigate("/orders");
  };

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
          <Shipping />
          {/* Payment Method */}
          <Payment />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 flex flex-col max-h-[620px]">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 min-h-0 space-y-4">
              {/* Scrollable items list */}
              <div className="overflow-y-scroll flex-1 min-h-0 -mr-2 pr-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Fixed totals & CTA */}
              <div className="flex-shrink-0 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-display text-lg">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={!canPlaceOrder || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                {canPlaceOrder && subtotal < 100 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Add {formatPrice(100 - subtotal)} more for free shipping
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
