import { supabase } from "@/supabaseClient";
import type { CartItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getCartProducts = async (cartItems: CartItem[]) => {
  console.log("getCartProducts fired");
  const ids = [...new Set(cartItems.map((item) => item.productId))];

  const { data, error } = await supabase
    .from("ProductsTable")
    .select("id, name, image, price")
    .in("id", ids);

  if (error) throw error;

  return cartItems.map((item) => {
    const product = data.find((p) => p.id === item.productId);
    return {
      ...item,
      name: product?.name,
      image: product?.image,
      price: product?.price,
    };
  });
};

export const useGetCartProducts = (
  cartId: string | null,
  cartItems: CartItem[],
  option = {},
) => {
  return useQuery({
    queryKey: [cartId, JSON.stringify(cartItems)],
    queryFn: () => getCartProducts(cartItems),
    ...option,
  });
};
