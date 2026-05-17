import { useAppSelector } from "@/app/hooks/useRedux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { useUser } from "@clerk/clerk-react";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import usePlaceOrder from "@/app/hooks/payment/usePlaceOrder";
import { useGetAddresses } from "@/app/hooks/address";
import useGetPaymentMethods from "@/app/hooks/payment/useGetPaymentMethods";
import type { Address } from "@/types";

const OrdersPreview = ({ canPlaceOrder }: { canPlaceOrder: boolean }) => {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  const { user } = useUser();
  const { data: customerId } = useGetCustomerId();
  const { data: addresses } = useGetAddresses();
  const { defaultCard } = useGetPaymentMethods();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = Math.round(subtotal + shipping + tax);

  const defaultAddress = addresses?.find((address: Address) => address.isDefault);

  const { mutate: placeOrder, isPending, error } = usePlaceOrder();
  const handlePlaceOrder = () => {
    if (!customerId || !defaultAddress || !defaultCard) return;

    placeOrder(
      {
        customerId,
        email: user?.emailAddresses[0].emailAddress ?? "",
        items,
        currency: "cad",
        address: defaultAddress,
        paymentMethodLast4: defaultCard.card.last4,
        paymentMethodBrand: defaultCard.card.brand,
        subtotal,
        shipping,
        tax,
        total,
      },
      {
        onSuccess: () => navigate("/order-success"),
      },
    );
  };

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

            {error && (
              <p className="text-sm text-destructive text-center">
                {error.message}
              </p>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={!canPlaceOrder || isPending}
            >
              {isPending ? "Processing..." : "Place Order"}
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
