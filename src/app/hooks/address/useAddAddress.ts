import { supabase } from "@/supabaseClient";
import type { Address } from "@/types";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddAddress = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<Address, "id" | "isDefault">) => {
      const hasAddresses = await supabase
        .from("AddressesTable")
        .select("id")
        .eq("user_id", user!.id)
        .limit(1);

      const isDefault = !hasAddresses.data?.length;

      const { data, error } = await supabase
        .from("AddressesTable")
        .insert({ ...input, user_id: user!.id, isDefault })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", user?.id] });
    },
  });
};
