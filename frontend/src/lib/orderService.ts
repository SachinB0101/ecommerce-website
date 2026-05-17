import { supabase } from "@/supabaseClient";
import type { Order } from "@/types";

export const saveOrderToDatabase = async (
  order: Order,
  clerkUserId: string,
) => {
  const { data, error } = await supabase
    .from("OrdersTable")
    .insert([
      {
        user_id: clerkUserId,
        email: order.email,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        address: order.address,
        payment_method_last4: order.paymentMethodLast4,
        payment_method_brand: order.paymentMethodBrand,
        payment_intent_id: order.paymentIntentId,
        currency: order.currency,
        estimated_delivery: order.estimatedDelivery,
        status: "processing",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
