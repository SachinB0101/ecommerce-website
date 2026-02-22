import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "./useRedux";
import { supabase } from "@/supabaseClient";
import type { CartItem } from "@/types";

const addItemToDB = async (cartId: string, item: CartItem) => {
  console.log(cartId);
  const { error } = await supabase.from("CartItemsTable").insert({
    cart_id: cartId,
    product_id: item.productId,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  });

  if (error) {
    console.error("Supabase Insert Failed");
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    console.error("Code:", error.code);
    throw error;
  }
};

export const useAddItemToDB = () => {
  const cartId = useAppSelector((state) => state.cart.cartId);

  return useMutation({
    mutationFn: (item: CartItem) => addItemToDB(cartId!, item),
  });
};
