import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetOrCreateCart } from "./useGetOrCreateCart";
import { useGetOrCreateUser } from "./useGetOrCreateUser";
import { setCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "./useRedux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cart } from "@/types";
import { getItem, setItem } from "@/lib/localStorage";

export const useUserDataSync = () => {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  //Getting the cartKey from local storage
  const [cartKey] = useState(() => {
    const item = getItem("cart-key");
    return (item as string) || uuidv4().toString();
  });
  //Setting the cartKey from local storage
  useEffect(() => {
    setItem("cart-key", cartKey);
  }, [cartKey]);

  //Getting the cart from the local storage
  const [cart] = useState(() => {
    const item = getItem(cartKey);
    return (
      (item as Cart) || {
        cartId: cartKey,
        items: [],
        isOpen: false,
      }
    );
  });
  //set the cart from local storage to redux store.
  //the listener handles persistence now
  useEffect(() => {
    dispatch(setCart(cart));
  }, [cart, cartKey, dispatch]);

  //Run when signedIn is enabled
  const {
    data: userId,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetOrCreateUser({ enabled: !!user?.id && isLoaded && !!isSignedIn });

  //Run when userId is enabled
  const {
    data: cartId,
    isLoading: isLoadingCart,
    isError: isErrorCart,
  } = useGetOrCreateCart(userId!, { enabled: !!userId });

  //Sync the local data with the database when user signedIn
  // useEffect(() => {
  //   if (cartId) dispatch(setCartId(cartId));
  // }, [cartId, dispatch]);

  if (!isSignedIn) return { isLoading: false, isError: false };

  return {
    isLoading: isLoadingUser || isLoadingCart,
    isError: isErrorCart || isErrorUser,
  };
};
