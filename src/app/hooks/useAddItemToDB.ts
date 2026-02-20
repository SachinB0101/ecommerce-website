import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "./useRedux";
import { supabase } from "@/supabaseClient";
import type { CartItem } from "@/types";


const addItemToDB = async (cartId: string, item: CartItem) => {
  const { error } = await supabase.from("CartItemsTable").insert({
    cart_id: cartId,
    product_id: item.productId,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  });

  if (error) throw new Error(error.message);
};

export const useAddItemToDB = () => {
  const cartId = useAppSelector((state) => state.cart.cartId);

  return useMutation({
    mutationFn: (item: CartItem) => addItemToDB(cartId!, item),
  });
};
