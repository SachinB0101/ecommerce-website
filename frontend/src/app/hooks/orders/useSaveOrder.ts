import { useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/supabaseClient";
import type { Order } from "@/types";

const useSaveOrder = () => {
  const { user } = useUser();

  return useMutation({
    mutationFn: async (order: Order) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("OrdersTable")
        .insert([
          {
            user_id: user.id,
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
    },
  });
};

export default useSaveOrder;
