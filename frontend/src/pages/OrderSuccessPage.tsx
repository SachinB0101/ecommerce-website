import { useAppSelector } from "@/app/hooks/useRedux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
  Check,
  ShoppingBag,
  Package,
  MapPin,
  CreditCard,
  Copy,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

export default function OrderSuccessPage() {
  const { lastOrder } = useAppSelector((state) => state.order);
  const [copied, setCopied] = useState(false);

  if (!lastOrder) {
    return <Navigate to="/products" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(lastOrder.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-12 max-w-4xl">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-display text-4xl font-bold mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Number Card */}
      <Card className="mb-6 border-2 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <div className="flex items-center gap-2">
                <p className="font-display text-2xl font-bold font-mono">
                  {lastOrder.id}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyOrderId}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="font-medium">
                  {new Date(lastOrder.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated Delivery
                </p>
                <p className="font-medium">
                  {new Date(lastOrder.estimatedDelivery).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Items ({lastOrder.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lastOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      {item.size && (
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-sm text-muted-foreground">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-1">{lastOrder.address.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {lastOrder.address.addressLine1}
                </p>
                {lastOrder.address.addressLine2 && (
                  <p className="text-sm text-muted-foreground">
                    {lastOrder.address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {lastOrder.address.city}, {lastOrder.address.state}{" "}
                  {lastOrder.address.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lastOrder.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">
                  {lastOrder.paymentMethodBrand.toUpperCase()} •••• $
                  {lastOrder.paymentMethodLast4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Payment Intent: {lastOrder.paymentIntentId}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(lastOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {lastOrder.shipping === 0
                      ? "FREE"
                      : formatPrice(lastOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(lastOrder.tax)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-display text-lg">
                    {formatPrice(lastOrder.total)}
                  </span>
                </div>
              </div>

              {/* Delivery Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">
                    Processing
                  </p>
                </div>
                <p className="text-xs text-blue-700">
                  Your order is being prepared for shipment. You'll receive a
                  tracking number soon.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/orders">View All Orders</Link>
                </Button>
              </div>

              {/* Email Confirmation */}
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">
                  A confirmation email has been sent to:
                </p>
                <p className="text-xs font-medium text-center break-all mt-1">
                  {lastOrder.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
