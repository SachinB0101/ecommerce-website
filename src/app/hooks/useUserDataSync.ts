import { useAuth } from "@clerk/clerk-react";
import { useGetOrCreateCart } from "./useGetOrCreateCart";
import { useGetOrCreateUser } from "./useGetOrCreateUser";
import { setCartId } from "@/features/cart/cartSlice";
import { useAppDispatch } from "./useRedux";
import { useEffect } from "react";

export const useUserDataSync = () => {
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  const {
    data: userId,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetOrCreateUser();

  const {
    data: cartId,
    isLoading: isLoadingCart,
    isError: isErrorCart,
  } = useGetOrCreateCart(userId!, { enabled: !!userId });

  useEffect(() => {
    if (cartId) dispatch(setCartId(cartId));
  }, [cartId, dispatch]);

  if (!isSignedIn) return { isLoading: false, isError: false };

  return {
    isLoading: isLoadingUser || isLoadingCart,
    isError: isErrorCart || isErrorUser,
  };
};
