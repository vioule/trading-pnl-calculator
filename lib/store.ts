import { combineSlices, configureStore } from "@reduxjs/toolkit";
import tradesSlice from "./features/trades/tradesSlice";
import currentPriceSlice from "./features/currentPrice/currentPriceSlice";

const rootReducer = combineSlices(tradesSlice, currentPriceSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
