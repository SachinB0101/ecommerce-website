import { useMutation } from "@tanstack/react-query";
import type { CartItem } from "@/types";
import { supabase } from "@/supabaseClient";

export const useDeleteCartItemFromDB = () => {
  return useMutation({
    mutationFn: async (item: CartItem) => {
      const { error } = await supabase
        .from("CartItemsTable")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      return item.id;
    },
  });
};
