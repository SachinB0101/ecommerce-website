import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import type { CartItem } from "@/types";
import { useAppSelector } from "../useRedux";

const buildQuery = (query: any, cartId: string, item: CartItem) => {
  query = query.eq("cart_id", cartId).eq("product_id", Number(item.product.id));

  if (item.size === null || item.size === undefined) {
    query = query.is("size", null);
  } else {
    query = query.eq("size", item.size);
  }

  if (item.color === null || item.color === undefined) {
    query = query.is("color", null);
  } else {
    query = query.eq("color", item.color);
  }

  return query;
};

const addItemToDB = async (cartId: string, item: CartItem) => {
  const { data: existing, error: fetchError } = await buildQuery(
    supabase.from("CartItemsTable").select("quantity"),
    cartId,
    item,
  );

  if (fetchError) throw fetchError;

  // console.log("from useAddItemToDB", existing);

  if (existing.length > 0) {
    const { error } = await buildQuery(
      supabase
        .from("CartItemsTable")
        .update({ quantity: existing[0].quantity + item.quantity }),
      cartId,
      item,
    );

    if (error) throw error;
  } else {
    const { error } = await supabase.from("CartItemsTable").insert({
      id: item.id,
      cart_id: cartId,
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    });

    if (error) throw error;
  }
};

export const useAddItemToDB = () => {
  const cartId = useAppSelector((state) => state.cart.cartId);

  return useMutation({
    mutationFn: (item: CartItem) => addItemToDB(cartId!, item),
  });
};
