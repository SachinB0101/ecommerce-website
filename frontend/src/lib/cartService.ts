import { supabase } from "@/supabaseClient";

export const clearCartFromDB = async (cartId: string) => {
  const { error } = await supabase
    .from("CartItemsTable")
    .delete()
    .eq("cart_id", cartId);

  if (error) throw error;
};
