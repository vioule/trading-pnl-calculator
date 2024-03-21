"use client";
import { addTrade, selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Table from "./components/Table";
import InputNumber from "./components/InputNumber";
import {
  decrementCurrentPrice,
  incrementCurrentPrice,
  selectCurrentPrice,
  updateCurrentPrice,
} from "@/lib/features/currentPrice/currentPriceSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const trades = useAppSelector(selectTrades);
  const currentPrice = useAppSelector(selectCurrentPrice);
  let totalAmounts: number[] = [];
  let totalAmount = 0;
  trades.map((trade) =>
    totalAmounts.push(
      trade.type === trades[0].type
        ? (totalAmount += parseFloat(trade.amount))
        : (totalAmount -= parseFloat(trade.amount))
    )
  );

  let totalAverages: number[] = [];
  trades.map((trade, i) => {
    if (i === 0) {
      totalAverages.push(parseFloat(trade.price));
    } else {
      totalAverages.push(
        trade.type === trades[0].type
          ? (totalAverages[i - 1] * totalAmounts[i - 1] +
              parseFloat(trade.price) * parseFloat(trade.amount)) /
              (totalAmounts[i - 1] + parseFloat(trade.amount))
          : totalAverages[i - 1]
      );
    }
  });
  const totalAverage = totalAverages[totalAverages.length - 1];
  const currentSize = parseFloat(currentPrice) * totalAmount;
  const size = totalAverage * totalAmount;

  return (
    <main className="flex min-h-screen flex-col px-10 py-4 gap-4 justify-between">
      <h1 className="text-xl text-slate-300">Pnl position calculator</h1>
      <div>
        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">
          Current Price
        </label>
        <InputNumber
          onChange={(e) => dispatch(updateCurrentPrice(e.target.value))}
          onIncrement={() => dispatch(incrementCurrentPrice())}
          onDecrement={() => dispatch(decrementCurrentPrice())}
          value={currentPrice}
        />
        <div className="flex gap-4 mt-4">
          <div className="border-slate-200 border-[1px] py-6 px-8 rounded-lg flex flex-col gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Money Invest
            </span>
            <span className="font-bold text-xl text-slate-600 tracking-wide">{`$${size}`}</span>
          </div>
          <div className="border-slate-200 border-[1px] py-6 px-8 rounded-lg flex flex-col gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Total Amount
            </span>
            <span className="font-bold text-xl text-slate-600 tracking-wide">
              {totalAmount}
            </span>
          </div>
          <div className="border-slate-200 border-[1px] py-6 px-8 rounded-lg flex flex-col gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Average Entry price
            </span>
            <span className="font-bold text-xl text-slate-600 tracking-wide">{`$${totalAverage}`}</span>
          </div>
          <div className="border-slate-200 border-[1px] py-6 px-8 rounded-lg flex flex-col gap-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Current Position size
            </span>
            <span className="font-bold text-xl text-slate-600 tracking-wide">{`$${currentSize}`}</span>
          </div>
        </div>
      </div>
      <Table />
      <button
        onClick={() => dispatch(addTrade())}
        className="bg-slate-100 p-4 rounded-lg font-bold"
      >
        Add trade
      </button>
    </main>
  );
}
