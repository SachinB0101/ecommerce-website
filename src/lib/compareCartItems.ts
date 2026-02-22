import type { CartItem } from "@/types";

export const compareCartItems = (item: CartItem, otherItem: CartItem) => {
  return (
    item.productId === otherItem.productId &&
    item.size === otherItem.size &&
    item.color === otherItem.color
  );
};
