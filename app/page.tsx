"use client";
import { addTrade, selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Table from "./components/Table";
import { selectCurrentPrice } from "@/lib/features/currentPrice/currentPriceSlice";
import Card from "./components/Card";
import CurrentAssetPrice from "./components/CurrentAssetPrice";
import PositionType from "./components/PositionType";

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

  const pnls = trades.map((trade, i) => {
    if (trade.type === trades[0].type) {
      return 0;
    }
    return trades[0].type === "buy"
      ? parseFloat(trade.amount) * parseFloat(trade.price) -
          parseFloat(trade.amount) * totalAverages[i - 1]
      : parseFloat(trade.amount) * totalAverages[i - 1] -
          parseFloat(trade.amount) * parseFloat(trade.price);
  });

  let pnl = 0;
  if (pnls.length) {
    pnl = pnls.reduce((a, b) => a + b);
  }

  const totalAverage = totalAverages[totalAverages.length - 1] || 0;
  const currentSize = parseFloat(currentPrice) * totalAmount;
  const size = totalAverage * totalAmount || 0;

  const latentPnl =
    (trades[0].type === "buy"
      ? totalAmount * parseFloat(currentPrice) - totalAmount * totalAverage
      : totalAmount * totalAverage - totalAmount * parseFloat(currentPrice)) ||
    0;

  const overallPnl = latentPnl + pnl || 0;

  return (
    <main className="flex min-h-screen flex-col px-10 py-4 gap-4 justify-between">
      <h1 className="text-xl text-slate-300 font-light">
        <span className="text-orange-500 font-semibold">PNL </span>position
        calculator
      </h1>
      <div>
        <div className="border-[1px] rounded-3xl border-slate-200 flex flex-col mt-4">
          <div className="flex items-center px-6 ">
            <PositionType />
            <Card
              title="Current position size"
              value={currentSize}
              moneySymbol
              color={false}
            />
            <Card title="Money invest" value={size} moneySymbol color={false} />
            <Card
              title="Total amount"
              value={totalAmount}
              moneySymbol={false}
              color={false}
            />
            <Card
              title="Avg entry price"
              value={totalAverage}
              moneySymbol
              color={false}
            />
          </div>
          <div className="flex bg-white border-t-[1px] rounded-b-3xl">
            <CurrentAssetPrice />
            <Card title="Overall pnl" value={overallPnl} moneySymbol color />
            <Card title="Pnl" value={pnl} moneySymbol color />
            <Card title="Latent pnl" value={latentPnl} moneySymbol color />
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <Table pnls={pnls} />
      </div>
      <button
        onClick={() => dispatch(addTrade())}
        className="bg-slate-50 text-slate-500 p-4 rounded-lg font-medium hover:bg-slate-100 hover:text-slate-600"
      >
        Add trade
      </button>
    </main>
  );
}
