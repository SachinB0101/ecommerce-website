import type { CartItem } from "@/types";

export const doesExistInCart = (item: CartItem, newItem: CartItem) => {
  return (
    item.productId === newItem.productId &&
    item.size === newItem.size &&
    item.color === newItem.color
  );
};
