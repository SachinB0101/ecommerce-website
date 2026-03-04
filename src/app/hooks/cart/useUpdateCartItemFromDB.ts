import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "@/types";
import { supabase } from "@/supabaseClient";
import { useAppSelector } from "../core";

interface UpdateCartItemPayload {
  item: CartItem;
  quantity: number;
}

export const useUpdateCartItemFromDB = () => {
  const queryClient = useQueryClient();
  const cartId = useAppSelector((state) => state.cart.cartId);

  return useMutation({
    mutationFn: async ({ item, quantity }: UpdateCartItemPayload) => {
      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity })
        .eq("id", item.id);

      if (error) throw error;

      return { id: item.id, quantity }; 
    },
    onSuccess: ({ id, quantity }) => {
      queryClient.setQueryData(["cart", cartId], (oldItems: CartItem[] = []) =>
        oldItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
  });
};
