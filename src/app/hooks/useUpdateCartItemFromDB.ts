import { useMutation } from "@tanstack/react-query";
import type { CartItem } from "@/types";
import { supabase } from "@/supabaseClient";

interface UpdateCartItemPayload {
  item: CartItem;
  quantity: number;
}

export const useUpdateCartItemFromDB = () => {

  return useMutation({
    mutationFn: async ({ item, quantity }: UpdateCartItemPayload) => {
      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity })
        .eq("id", item.id);

      if (error) throw error;

      return { id: item.id, quantity };
    },
  });
};
