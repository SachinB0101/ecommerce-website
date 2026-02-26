import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  setCart,
} from "../../features/cart/cartSlice";
import { setItem } from "@/lib/localStorage";
import type { RootState } from "../store/store";

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  matcher: (action) =>
    setCart.match(action) ||
    addToCart.match(action) ||
    removeFromCart.match(action) ||
    updateCart.match(action) ||
    clearCart.match(action),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const cart = state.cart;
    console.log(cart); //debuging
    if (cart.cartId) {
      setItem(cart.cartId, cart);
    }
  },
});
