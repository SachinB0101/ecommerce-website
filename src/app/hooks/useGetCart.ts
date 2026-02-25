import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { Cart, CartItem, CartItemProduct } from "@/types";
import { compareCartItems } from "@/lib/compareCartItems";

interface RawCartItem {
  quantity: number;
  size?: string;
  color?: string;
  ProductsTable: CartItemProduct;
}

const transformDbData = (data: RawCartItem[]): CartItem[] => {
  return data.map((item) => ({
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

  if (error) throw error;

  const DBCart = transformDbData(data as unknown as CartItem[]);

  for (const localItem of cartLocal.items) {
    const existingItem = DBCart.find((x) => compareCartItems(x, localItem));
    console.log("from useGetCart", existingItem);

    if (existingItem) {
      const { error } = await supabase
        .from("CartItemsTable")
        .update({ quantity: existingItem.quantity + localItem.quantity })
        .eq("cart_id", cartId)
        .eq("product_id", localItem.product.id)
        .eq("size", localItem.size)
        .eq("color", localItem.color);

      if (error) throw error;

      existingItem.quantity += localItem.quantity;
    } else {
      // Item is new — insert it
      const { error } = await supabase.from("CartItemsTable").insert({
        cart_id: cartId,
        product_id: localItem.product.id,
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
