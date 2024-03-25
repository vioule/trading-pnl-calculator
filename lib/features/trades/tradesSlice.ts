import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { PayloadAction } from "@reduxjs/toolkit/dist/react";

export interface TradeState {
  id: string;
  type: "buy" | "sell";
  price: string;
  amount: string;
}

let initialState: TradeState[] = [];

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    setTrades(state, action: PayloadAction<TradeState[]>) {
      return action.payload;
    },
    addTrade(state) {
      state.push({
        id: uuid(),
        type: "buy",
        price: "0",
        amount: "0",
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
    switchType(state, action: PayloadAction<string>) {
      return state.map((trade) => {
        if (trade.id === action.payload) {
          return { ...trade, type: trade.type === "buy" ? "sell" : "buy" };
        }
        return trade;
      });
    },
    incrementPrice(state, action: PayloadAction<string>) {
      return state.map((trade) => {
        if (trade.id === action.payload) {
          return { ...trade, price: (parseFloat(trade.price) + 1).toString() };
        }
        return trade;
      });
    },
    decrementPrice(state, action: PayloadAction<string>) {
      return state.map((trade) => {
        if (trade.id === action.payload) {
          return { ...trade, price: (parseFloat(trade.price) - 1).toString() };
        }
        return trade;
      });
    },
    incrementAmount(state, action: PayloadAction<string>) {
      return state.map((trade) => {
        if (trade.id === action.payload) {
          return {
            ...trade,
            amount: (parseFloat(trade.amount) + 1).toString(),
          };
        }
        return trade;
      });
    },
    decrementAmount(state, action: PayloadAction<string>) {
      return state.map((trade) => {
        if (trade.id === action.payload) {
          return {
            ...trade,
            amount: (parseFloat(trade.amount) - 1).toString(),
          };
        }
        return trade;
      });
    },
  },
  selectors: {
    selectTrades: (trades) => trades,
    selectTypeById: (trades, id) => {
      const trade = trades.find((trade) => trade.id === id);
      if (trade) {
        return trade.type;
      }
    },
  },
});

export const {
  setTrades,
  addTrade,
  updateTrade,
  deleteTrade,
  switchType,
  incrementPrice,
  decrementPrice,
  incrementAmount,
  decrementAmount,
} = tradesSlice.actions;
export const { selectTrades, selectTypeById } = tradesSlice.selectors;
export default tradesSlice;
