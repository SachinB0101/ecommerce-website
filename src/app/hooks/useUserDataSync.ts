import { useAuth, useUser } from "@clerk/clerk-react";
import { setCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "./useRedux";
import { useEffect, useRef } from "react";
import { setItem } from "@/lib/localStorage";
import { useGetCartId } from "./useGetCartId";
import { useGetCart } from "./useGetCart";
import { useMergeCart } from "./useMergeCart";
import { useCartRealtime } from "./useCartRealtime";
import { useGuestCart } from "./useGuestCart";

export const useUserDataSync = () => {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const hasMergedRef = useRef(false);
  const { cartKey, cartLocal } = useGuestCart();
  const { mutate: mergeCart } = useMergeCart();

  useEffect(() => {
    if (!isSignedIn) {
      hasMergedRef.current = false;
      dispatch(setCart(cartLocal));
    }
  }, [isSignedIn, cartLocal, dispatch]);

  const {
    data: cartId,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetCartId(user ?? undefined, {
    enabled: !!user?.id && isLoaded && !!isSignedIn,
  });

  const {
    data: dbItems,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error: errorCart,
  } = useGetCart(cartId ?? "", {
    enabled: !!cartId && isLoaded && !!isSignedIn,
  });

  useEffect(() => {
    if (!cartId || !dbItems) return;
    if (hasMergedRef.current) return;

    if (cartLocal.items.length > 0) {
      mergeCart(
        { cartId, cartLocal, dbItems },
        {
          onSuccess: (mergedItems) => {
            hasMergedRef.current = true;
            dispatch(setCart({ cartId, items: mergedItems, isOpen: false }));
            setItem(cartKey, { cartId: cartKey, items: [], isOpen: false });
          },
        },
      );
    } else {
      dispatch(setCart({ cartId, items: dbItems, isOpen: false }));
    }
  }, [cartId, dbItems]); // intentional — merge runs once when DB data first arrives

  useCartRealtime(isSignedIn ? (cartId ?? null) : null);

  return {
    isLoading: isSignedIn ? isLoadingUser || isLoadingCart : false,
    isError: isSignedIn ? isErrorUser || isErrorCart : false,
    error: isSignedIn && isErrorCart ? errorCart : null,
  };
};
