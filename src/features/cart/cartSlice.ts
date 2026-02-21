import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import { doesExistInCart } from "./doesExistInCart";

import type { Cart } from "@/types";

const initialState: Cart = {
  cartId: null,
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cartId = action.payload.cartId;
      state.items = action.payload.items;
      state.isOpen = action.payload.isOpen;
    },

    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      if (state.items.length === 0) {
        state.items.push(newItem);
      } else {
        const existingItem = state.items.find((item) =>
          doesExistInCart(item, newItem),
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const theItem = action.payload;
      state.items = state.items.filter(
        (item) => !doesExistInCart(item, theItem),
      );
    },

    updateCart: (state, action: PayloadAction<CartItem>) => {
      const theItem = action.payload;
      const index = state.items.findIndex((item) =>
        doesExistInCart(item, theItem),
      );

      if (theItem.quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity = theItem.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  setCartId,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  setCartOpen,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
