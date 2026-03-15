import { useAppSelector } from "@/app/hooks/useRedux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUser } from "@clerk/clerk-react";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import useUpdateCustomerId from "@/app/hooks/payment/useUpdateCustomerId";
import { Loader2 } from "lucide-react";

const OrdersPreview = ({ canPlaceOrder }: { canPlaceOrder: boolean }) => {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { user } = useUser();

  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  const { mutate: updateCustomerId } = useUpdateCustomerId();

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
      const res = await fetch("http://localhost:8080/api/payments/checkout", {
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
  }, [isLoadingCustomerId]); 

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    navigate("/orders");
  };

  if (!clientSecret) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
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
              <span className="font-display text-lg">{formatPrice(total)}</span>
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
  );
};
export default OrdersPreview;
