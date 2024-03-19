import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit/dist/react";

export interface TradeState {
  id: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
}

const initialState: TradeState[] = [];

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    addTrade(state) {
      state.push({
        id: uuid(),
        type: "buy",
        price: 0,
        amount: 0,
      });
    },
    deleteTrade(state, action: PayloadAction<string>) {
      return state.filter((trade) => {
        if (trade.id !== action.payload) {
          return trade;
        }
      });
    },
    updateTrade(state, action: PayloadAction<TradeState>) {
      return state.map((trade) => {
        if (trade.id === action.payload.id) {
          return action.payload;
        }
        return trade;
      });
    },
  },
  selectors: {
    selectTrades: (trades) => trades,
  },
});

export const { addTrade, updateTrade, deleteTrade } = tradesSlice.actions;
export const { selectTrades } = tradesSlice.selectors;
export default tradesSlice.reducer;
