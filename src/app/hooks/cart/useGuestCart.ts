import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cart } from "@/types";
import { getItem, setItem } from "@/lib/localStorage";

export const useGuestCart = (): { cartKey: string; cartLocal: Cart } => {
  const [cartKey] = useState<string>(
    () => (getItem("cart-key") as string) || uuidv4().toString(),
  );

  useEffect(() => {
    setItem("cart-key", cartKey);
  }, [cartKey]);

  const [cartLocal] = useState<Cart>(() => {
    const item = getItem(cartKey);
    const isValidCart = item && typeof item === "object" && "items" in item;
    return isValidCart
      ? (item as Cart)
      : { cartId: cartKey, items: [], isOpen: false };
  });

  return { cartKey, cartLocal };
};
