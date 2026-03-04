import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Address, PaymentMethod } from "@/types";
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  AlertCircle,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks/core";

export function CheckoutPage() {
  const navigate = useNavigate();
  // const { user } = useUser();
  // const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const addresses: Address[] = [
    {
      id: "1",
      fullName: "John Doe",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
  ];
  const paymentMethods: PaymentMethod[] = [];

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {addresses.length === 0 ? (
                <div className="border border-dashed rounded-lg p-6 text-center">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No saved addresses. Add one to continue.
                  </p>
                  <Button asChild size="sm">
                    <Link to="/profile">Add Address</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => console.log("button got clicked")}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        true
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{address.fullName}</p>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        {true && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Link to="/profile">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit Address
                    </Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.length === 0 ? (
                <div className="border border-dashed rounded-lg p-6 text-center">
                  <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No saved payment methods. Add one to continue.
                  </p>
                  <Button asChild size="sm">
                    <Link to="/profile">Add Payment Method</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => console.log("button clicked")}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        true
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {pm.cardType} •••• {pm.lastFour}
                              </p>
                              {pm.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Expires {pm.expiryMonth}/{pm.expiryYear}
                            </p>
                          </div>
                        </div>
                        {true && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <Link to="/profile">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit Payment
                    </Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
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

                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                {subtotal < 100 && (
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
