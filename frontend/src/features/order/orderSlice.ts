import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";

interface OrderState {
  lastOrder: Order | null;
}

const initialState: OrderState = {
  lastOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLastOrder: (state, action: PayloadAction<Order>) => {
      state.lastOrder = action.payload;
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
});

export const { setLastOrder, clearLastOrder } = orderSlice.actions;
export default orderSlice.reducer;
