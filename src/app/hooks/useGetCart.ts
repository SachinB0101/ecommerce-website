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
  console.log(`this is cartLocal - ${cartLocal}`);
  // Try to get existing cart with its items
  const { data, error } = await supabase
    .from("CartItemsTable")
    .select(
      `
    size,
    color,
    quantity,
    ProductsTable!inner(
      id
    )
    `,
    )
    .eq("cart_id", cartId);

  if (error) throw error;

  const DBCart = transformDbData(data);

  //Syncing the local cart and DBCart
  //Taking the union of cartLocal and DBCart
  const updatedCart: CartItem[] = [
    ...DBCart,
    ...cartLocal.items.filter(
      (localItem) =>
        !DBCart.some((DBItem) => compareCartItems(localItem, DBItem)),
    ),
  ];

  //adding localCart items to the DB
  for (const item of cartLocal.items) {
    const { error } = await supabase.from("CartItemsTable").insert({
      cart_id: cartId,
      product_id: item.productId,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    });

    if (error) throw error;
  }

  return {
    cartId: cartId,
    items: updatedCart,
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
