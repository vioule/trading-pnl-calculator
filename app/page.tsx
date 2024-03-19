"use client";
import { addTrade, selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Trade from "./components/Trade";

export default function Home() {
  const dispatch = useAppDispatch();
  const trades = useAppSelector(selectTrades);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {trades.map((trade) => (
        <Trade data={trade} key={trade.id} />
      ))}
      <button onClick={() => dispatch(addTrade())}>Add trade</button>
    </main>
  );
}
