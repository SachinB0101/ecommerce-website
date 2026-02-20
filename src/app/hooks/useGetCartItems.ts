import { supabase } from "@/supabaseClient";
import type { CartItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getCartItems = async (cartId: string | null): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from("CartItemsTable")
    .select(
      `product_id,
        quantity,
        size,
        color
        `,
    )
    .eq("cart_id", cartId);

  if (error) {
    throw new Error();
  }
  return (data ?? []).map((item) => ({
    productId: item.product_id,
    quantity: item.quantity,
    size: item.size ?? undefined,
    color: item.color ?? undefined,
  }));
};

export const useGetCartItems = (cartId: string | null) => {
  return useQuery({
    queryKey: ["cartItem", cartId],
    queryFn: () => getCartItems(cartId),
    enabled: !!cartId,
  });
};
