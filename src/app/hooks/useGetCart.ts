import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { Cart, CartItem } from "@/types";
import { compareCartItems } from "@/lib/compareCartItems";

const transformDbData = (data): CartItem[] => {
  const cartItems: CartItem[] = data.map((item) => ({
    productId: item.ProductsTable.id,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));

  return cartItems;
};

const getCart = async (cartId: string, cartLocal: Cart): Promise<Cart> => {
  const { data, error } = await supabase
    .from("CartItemsTable")
    .select(`size, color, quantity, ProductsTable!inner(id)`)
    .eq("cart_id", cartId);

  if (error) throw error;

  const DBCart = transformDbData(data);

  for (const localItem of cartLocal.items) {
    const existingItem = DBCart.find((x) => compareCartItems(x, localItem));
    console.log("from useGetCart", existingItem);

    if (existingItem) {
      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity: existingItem.quantity + localItem.quantity })
        .eq("cart_id", cartId)
        .eq("product_id", localItem.productId)
        .eq("size", localItem.size)
        .eq("color", localItem.color);

      if (error) throw error;

      existingItem.quantity += localItem.quantity;
    } else {
      // Item is new — insert it
      const { error } = await supabase.from("CartItemsTable").insert({
        cart_id: cartId,
        product_id: localItem.productId,
        quantity: localItem.quantity,
        size: localItem.size,
        color: localItem.color,
      });

      if (error) throw error;

      DBCart.push({ ...localItem });
    }
  }

  return {
    cartId,
    items: DBCart,
    isOpen: false,
  };
};

export const useGetCart = (cartId: string, cartLocal: Cart, options = {}) => {
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCart(cartId, cartLocal),
    ...options,
  });
};
