import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { Cart, CartItem, CartItemProduct } from "@/types";
import { compareCartItems } from "@/lib/compareCartItems";

interface RawCartItem {
  id: string;
  quantity: number;
  size?: string;
  color?: string;
  ProductsTable: CartItemProduct;
}

const transformDbData = (data: RawCartItem[]): CartItem[] => {
  return data.map((item) => ({
    id: item.id,
    product: item.ProductsTable,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));
};

const getCart = async (cartId: string, cartLocal: Cart): Promise<Cart> => {
  const { data, error } = await supabase
    .from("CartItemsTable")
    .select(
      `
      id,
      size,
      color,
      quantity,
      ProductsTable!inner(
        id,
        name,
        description,
        price,
        category,
        image,
        images,
        inStock,
        rating,
        reviews,
        brand,
        material
      )
    `,
    )
    .eq("cart_id", cartId);

  if (error) console.log(`the error is ${error}`);

  const DBCart = transformDbData(data as unknown as RawCartItem[]);

  for (const localItem of cartLocal.items) {
    const existingItem = DBCart.find((x) => compareCartItems(x, localItem));

    if (existingItem) {
      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity: existingItem.quantity + localItem.quantity })
        .eq("id", existingItem.id);

      if (error) throw error;

      existingItem.quantity += localItem.quantity;
    } else {
      // Insert WITHOUT passing id — let Supabase auto-generate it
      const { data: insertedItem, error } = await supabase
        .from("CartItemsTable")
        .insert({
          cart_id: cartId,
          product_id: localItem.product.id,
          quantity: localItem.quantity,
          size: localItem.size,
          color: localItem.color,
        })
        .select("id") // ✅ get back the real DB id
        .single();

      if (error) throw error;

      DBCart.push({ ...localItem, id: insertedItem.id });
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
    staleTime: 0,
    ...options,
  });
};
