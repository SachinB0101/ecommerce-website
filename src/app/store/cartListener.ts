import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../../features/cart/cartSlice";
import { setItem } from "@/lib/localStorage";
import type { RootState } from "../store/store";

export const cartListener = createListenerMiddleware();

cartListener.startListening({
  matcher: (action) =>
    addToCart.match(action) ||
    removeFromCart.match(action) ||
    updateCart.match(action) ||
    clearCart.match(action),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const cart = state.cart;
    console.log("Cart changed:", cart); // 👈 move outside the if
    if (cart.cartId) {
      setItem(cart.cartId, cart);
    }
  },
});
