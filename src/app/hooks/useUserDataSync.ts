import { useAuth, useUser } from "@clerk/clerk-react";
import { setCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "./useRedux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cart } from "@/types";
import { getItem, setItem } from "@/lib/localStorage";
import { useGetCartId } from "./useGetCartId";
import { useGetCart } from "./useGetCart";
import { useCartRealtime } from "./useCartRealtime";

export const useUserDataSync = () => {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  const [cartKey] = useState(() => {
    const item = getItem("cart-key");
    return (item as string) || uuidv4().toString();
  });

  useEffect(() => {
    setItem("cart-key", cartKey);
  }, [cartKey]);

  const [cartLocal] = useState(() => {
    const item = getItem(cartKey);
    return (
      (item as Cart) || {
        cartId: cartKey,
        items: [],
        isOpen: false,
      }
    );
  });

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setCart(cartLocal));
    }
  }, [cartLocal, isSignedIn, dispatch]);

  const {
    data: cartId,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetCartId(user ?? undefined, {
    enabled: !!user?.id && isLoaded && !!isSignedIn,
  });

  const {
    data: updatedCart,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error: errorCart,
  } = useGetCart(cartId ?? "", cartLocal, {
    enabled: !!cartId && isLoaded && !!isSignedIn,
  });

  useCartRealtime(isSignedIn ? cartId : null);

  useEffect(() => {
    if (updatedCart) {
      dispatch(setCart(updatedCart));

      // Clear the stale guest cart after syncing
      setItem(cartKey, { cartId: cartKey, items: [], isOpen: false });
    }
  }, [updatedCart, dispatch]);

  if (!isSignedIn) return { isLoading: false, isError: false };

  if (isErrorCart) console.log(errorCart);

  return {
    isLoading: isLoadingUser || isLoadingCart,
    isError: isErrorUser || isErrorCart,
  };
};
