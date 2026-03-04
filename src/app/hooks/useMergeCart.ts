import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compareCartItems } from "@/lib/compareCartItems";
import type { Cart, CartItem } from "@/types";

interface MergeCartParams {
  cartId: string;
  cartLocal: Cart;
  dbItems: CartItem[];
}

const mergeCart = async ({
  cartId,
  cartLocal,
  dbItems,
}: MergeCartParams): Promise<CartItem[]> => {
  const mergedItems = [...dbItems];

  for (const localItem of cartLocal.items) {
    const existingItem = mergedItems.find((x) =>
      compareCartItems(x, localItem),
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + localItem.quantity;

      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity: newQuantity })
        .eq("id", existingItem.id);

      if (error) throw error;

      existingItem.quantity = newQuantity;
    } else {
      const { data: insertedItem, error } = await supabase
        .from("CartItemsTable")
        .insert({
          cart_id: cartId,
          product_id: localItem.product.id,
          quantity: localItem.quantity,
          size: localItem.size,
          color: localItem.color,
        })
        .select("id")
        .single();

      if (error) throw error;

      mergedItems.push({ ...localItem, id: insertedItem.id });
    }
  }

  return mergedItems;
};

export const useMergeCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mergeCart,
    onSuccess: (mergedItems, { cartId }) => {
      queryClient.setQueryData(["cart", cartId], mergedItems);
    },
  });
};