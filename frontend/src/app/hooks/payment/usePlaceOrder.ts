import { useMutation } from "@tanstack/react-query";
import type { CartItem, Address, Order } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { setLastOrder } from "@/features/order/orderSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { useUser } from "@clerk/clerk-react";
import { saveOrderToDatabase } from "@/lib/orderService";
import { clearCartFromDB } from "@/lib/cartService";
import type { RootState } from "@/app/store/store";

interface PlaceOrderPayload {
  customerId: string;
  email: string;
  items: CartItem[];
  currency: string;
  address: Address;
  paymentMethodLast4: string;
  paymentMethodBrand: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const placeOrder = async (payload: PlaceOrderPayload) => {
  const api_url = import.meta.env.VITE_SERVER_API_URL;
  
  if (!api_url) {
    throw new Error("Backend API URL is not configured. Please set VITE_SERVER_API_URL in .env");
  }
  
  const res = await fetch(`${api_url}/api/payments/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Payment failed. Please try again.");
  }

  return data;
};

const usePlaceOrder = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const cartId = useSelector((state: RootState) => state.cart.cartId);

  return useMutation({
    mutationFn: async (payload: PlaceOrderPayload) => {
      const response = await placeOrder(payload);

      // Create order object with all details
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 business days

      const order: Order = {
        id: response.paymentIntentId,
        customerId: payload.customerId,
        email: payload.email,
        items: payload.items,
        subtotal: payload.subtotal,
        shipping: payload.shipping,
        tax: payload.tax,
        total: payload.total,
        address: payload.address,
        paymentMethodLast4: payload.paymentMethodLast4,
        paymentMethodBrand: payload.paymentMethodBrand,
        paymentIntentId: response.paymentIntentId,
        currency: payload.currency,
        createdAt: new Date().toISOString(),
        estimatedDelivery: estimatedDelivery.toISOString(),
      };

      // Save order to Supabase database
      if (user?.id) {
        try {
          await saveOrderToDatabase(order, user.id);
        } catch (dbError) {
          console.error("Failed to save order to database:", dbError);
          // Don't throw - let the order succeed even if DB save fails
        }
      }

      // Clear cart items from Supabase database
      if (cartId) {
        try {
          await clearCartFromDB(cartId);
        } catch (dbError) {
          console.error("Failed to clear cart from database:", dbError);
          // Don't throw - let the order succeed even if DB clear fails
        }
      }

      // Dispatch to Redux
      dispatch(setLastOrder(order));
      // Clear the cart after successful order
      dispatch(clearCart());

      return response;
    },
  });
};

export default usePlaceOrder;
