import { useState } from "react";
import useGetOrders from "@/app/hooks/orders/useGetOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Loader2,
  ChevronRight,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { OrderRecord } from "@/app/hooks/orders/useGetOrders";

export default function OrderHistoryPage() {
  const { data: orders = [], isLoading, isError } = useGetOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  if (isLoading) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="text-center py-20">
          <p className="text-destructive mb-4">Error loading orders</p>
          <Button asChild>
            <Link to="/products">Back to Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-12 max-w-4xl">
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">
            No Orders Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="container py-12 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setSelectedOrder(null)}
          className="mb-6"
        >
          ← Back to Orders
        </Button>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Order Details
              </h1>
              <p className="text-muted-foreground">
                Order ID: {selectedOrder.payment_intent_id}
              </p>
            </div>
            <Badge
              variant="outline"
              className="capitalize text-base py-1.5 px-3"
            >
              {selectedOrder.status}
            </Badge>
          </div>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Items ({selectedOrder.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any, index: number) => (
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

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg space-y-1">
                <p className="font-medium">{selectedOrder.address.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.address.addressLine1}
                </p>
                {selectedOrder.address.addressLine2 && (
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.address.addressLine2}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.address.city}, {selectedOrder.address.state}{" "}
                  {selectedOrder.address.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium mb-1">
                    {selectedOrder.payment_method_brand.toUpperCase()} •••• $
                    {selectedOrder.payment_method_last4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedOrder.currency.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {selectedOrder.shipping === 0
                      ? "FREE"
                      : formatPrice(selectedOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(selectedOrder.tax)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-display text-lg">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dates */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Date
                  </p>
                  <p className="font-medium">
                    {new Date(selectedOrder.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Estimated Delivery
                  </p>
                  <p className="font-medium">
                    {new Date(selectedOrder.estimated_delivery).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="font-display text-4xl font-bold mb-8">Order History</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setSelectedOrder(order)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-display font-semibold text-lg">
                      Order {order.payment_intent_id.substring(0, 8)}...
                    </p>
                    <Badge variant="outline" className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} •{" "}
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="font-semibold text-lg">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}