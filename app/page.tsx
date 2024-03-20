"use client";
import { addTrade } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch } from "@/lib/hooks";
import Table from "./components/Table";

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Table />
      <button onClick={() => dispatch(addTrade())}>Add trade</button>
    </main>
  );
}
