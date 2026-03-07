import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import type { PaymentMethod } from "@/types";
import { supabase } from "@/supabaseClient";
import type { UserResource } from "@clerk/shared/types";

const getPaymentMethods = async (
  user: UserResource | null | undefined,
): Promise<PaymentMethod[]> => {
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("PaymentMethodsTable")
    .select("id, cardType, lastFour, expiryMonth, expiryYear, isDefault")
    .eq("user_id", user.id)
    .order("isDefault", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const useGetPaymentMethods = () => {
  const { user } = useUser();

  return useQuery<PaymentMethod[]>({
    queryKey: ["addresses", user?.id],
    queryFn: () => getPaymentMethods(user),
  });
};
