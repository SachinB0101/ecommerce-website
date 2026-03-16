import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks/useRedux";
import OrdersPreview from "@/components/checkout/OrdersPreview";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import useCreateCustomer from "@/app/hooks/payment/useCreateCustomer";

export function CheckoutPage() {
  const { items } = useAppSelector((state) => state.cart);

  const [hasShipped, setHasShipped] = useState(false);
  const [hasPayment, setHasPayment] = useState(false);
  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  const { mutate: createCustomer, isPending: isCreatingCustomer } =
    useCreateCustomer();

  const canPlaceOrder = hasPayment && hasShipped && items.length > 0;

  useEffect(() => {
    if (!isLoadingCustomerId) {
      if (!customerId) {
        createCustomer();
      }
    }
  }, [customerId, isLoadingCustomerId, createCustomer]);

  if (isLoadingCustomerId || isCreatingCustomer) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

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
        <div className="lg:col-span-2 space-y-6">
          <ShippingAddress setHasShipped={setHasShipped} />
          <PaymentMethod setHasPayment={setHasPayment} />
        </div>
        <OrdersPreview canPlaceOrder={canPlaceOrder} />
      </div>
    </div>
  );
}
