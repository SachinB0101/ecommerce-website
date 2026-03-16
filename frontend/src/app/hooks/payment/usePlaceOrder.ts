
import { useMutation } from "@tanstack/react-query";
import type { CartItem } from "@/types";

interface PlaceOrderPayload {
  customerId: string;
  email: string;
  items: CartItem[];
  currency: string;
}

const placeOrder = async (payload: PlaceOrderPayload) => {
  const res = await fetch("http://localhost:8080/api/payments/checkout", {
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
  return useMutation({
    mutationFn: placeOrder,
  });
};

export default usePlaceOrder;