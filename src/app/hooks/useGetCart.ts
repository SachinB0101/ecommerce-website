import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import type { CartItem, CartItemProduct } from "@/types";

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

const fetchCart = async (cartId: string): Promise<CartItem[]> => {
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

  if (error) throw error;

  return transformDbData(data as unknown as RawCartItem[]);
};

export const useGetCart = (cartId: string, options = {}) => {
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => fetchCart(cartId),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};