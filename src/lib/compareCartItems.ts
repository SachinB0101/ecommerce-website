import type { CartItem } from "@/types";

export const compareCartItems = (item: CartItem, otherItem: CartItem) => {
  return (
    item.productId === otherItem.productId &&
    (item.size ?? null) === (otherItem.size ?? null) &&
    (item.color ?? null) === (otherItem.color ?? null)
  );
};
