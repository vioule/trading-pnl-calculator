import { configureStore } from "@reduxjs/toolkit";
import tradesReducer from "./features/trades/tradesSlice";

export const store = configureStore({
  reducer: {
    trades: tradesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
