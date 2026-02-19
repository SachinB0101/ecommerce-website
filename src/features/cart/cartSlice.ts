import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import { doesExistInCart } from "./doesExistInCart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) =>
        doesExistInCart(item, newItem),
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
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
      console.log("in the reducer")
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart, setCartOpen } =
  cartSlice.actions;

export default cartSlice.reducer;
