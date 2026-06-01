import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { supabase, isSupabaseConfigured } from "@/supabaseClient";

export interface OrderRecord {
  id: string;
  created_at: string;
  user_id: string;
  email: string;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: any;
  payment_method_last4: string;
  payment_method_brand: string;
  payment_intent_id: string;
  currency: string;
  status: string;
  estimated_delivery: string;
}

const useGetOrders = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user) return [];

      if (!isSupabaseConfigured || !supabase) {
        console.warn("Supabase is not configured. Returning empty orders.");
        return [];
      }

      const { data, error } = await supabase
        .from("OrdersTable")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
        return [];
      }
      return (data as OrderRecord[]) || [];
    },
    enabled: !!user,
  });
};

export default useGetOrders;
