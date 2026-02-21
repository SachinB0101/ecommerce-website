import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import type { CartItem } from "@/types";

const mergeCartItems = async ({
  cartId,
  items,
}: {
  cartId: string;
  items: CartItem[];
}) => {
  const rows = items.map((item) => ({
    cart_id: cartId,
    product_id: Number(item.productId),
    quantity: item.quantity,
    size: item.size ?? null,
    color: item.color ?? null,
  }));

  const { error } = await supabase.from("CartItemsTable").upsert(rows, {
    onConflict: "cart_id, product_id, size, color",
    ignoreDuplicates: false,
  });

  if (error) throw error;
};

export const useMergeCartItems = () => {
  return useMutation({
    mutationFn: mergeCartItems,
  });
};
