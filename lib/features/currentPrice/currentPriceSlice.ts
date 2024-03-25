import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/dist/react";

let initialState = "0";

const currentPriceSlice = createSlice({
  name: "currentPrice",
  initialState,
  reducers: {
    updateCurrentPrice(state, action: PayloadAction<string>) {
      return action.payload;
    },
    incrementCurrentPrice(state) {
      return (parseFloat(state) + 1).toString();
    },
    decrementCurrentPrice(state) {
      return (parseFloat(state) - 1).toString();
    },
  },

  selectors: {
    selectCurrentPrice: (currentPrice) => currentPrice,
  },
});

export const {
  updateCurrentPrice,
  incrementCurrentPrice,
  decrementCurrentPrice,
} = currentPriceSlice.actions;
export const { selectCurrentPrice } = currentPriceSlice.selectors;
export default currentPriceSlice;
