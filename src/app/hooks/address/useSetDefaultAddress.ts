import { supabase } from "@/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSetDefaultAddress = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error: resetError } = await supabase
        .from("AddressesTable")
        .update({ isDefault: false })
        .eq("user_id", user!.id)
        .eq("isDefault", true);

      if (resetError) throw resetError;

      const { data, error: setError } = await supabase
        .from("AddressesTable")
        .update({ isDefault: true })
        .eq("id", id)
        .eq("user_id", user!.id)
        .select()
        .single();

      if (setError) throw setError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", user?.id] });
    },
  });
};
