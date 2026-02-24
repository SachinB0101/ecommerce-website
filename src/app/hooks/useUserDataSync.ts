import { useAuth, useUser } from "@clerk/clerk-react";
import { setCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "./useRedux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Cart } from "@/types";
import { getItem, setItem } from "@/lib/localStorage";
import { useGetCartId } from "./useGetCartId";
import { useGetCart } from "./useGetCart";

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
  //set the cart from local storage to redux store.
  //the listener handles persistence now
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setCart(cartLocal));
    } else {
      console.log(`user is signedIn ${user?.id}`);
    }
  }, [cartLocal, isSignedIn, dispatch]);

  //Run when signedIn is enabled
  const {
    data: cartId,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetCartId(user, { enabled: !!user?.id && isLoaded && !!isSignedIn });

  //Run when cartId is enabled
  const {
    data: updatedCart,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error: errorCart,
  } = useGetCart(cartId!, cartLocal, {
    enabled: !!cartId && isLoaded && !!isSignedIn,
  });

  useEffect(() => {
    if (updatedCart) dispatch(setCart(updatedCart));
  }, [updatedCart, dispatch]);

  if (!isSignedIn) return { isLoading: false, isError: false };

  if (isErrorCart) console.log(errorCart);

  return {
    isLoading: isLoadingUser || isLoadingCart,
    isError: isErrorUser || isErrorCart,
  };
};
