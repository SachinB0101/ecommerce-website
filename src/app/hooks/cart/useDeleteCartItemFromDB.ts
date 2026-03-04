import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "@/types";
import { supabase } from "@/supabaseClient";
import { useAppSelector } from "../useRedux";

export const useDeleteCartItemFromDB = () => {
  const queryClient = useQueryClient();
  const cartId = useAppSelector((state) => state.cart.cartId);

  return useMutation({
    mutationFn: async (item: CartItem) => {
      const { error } = await supabase
        .from("CartItemsTable")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      return item.id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["cart", cartId], (oldItems: CartItem[] = []) =>
        oldItems.filter((item) => item.id !== deletedId),
      );
    },
  });
};
