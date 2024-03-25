import { selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";

export default function PositionType() {
  const trades = useAppSelector(selectTrades);
  let type = null;
  if (trades.length > 0) {
    type = trades[0].type === "buy" ? "long" : "short";
  }
  const color =
    (type === "long"
      ? "text-green-500 bg-green-100"
      : "text-red-500 bg-red-100") || "";
  return (
    type && (
      <div
        className={`flex items-center uppercase font-bold text-2xl rounded-lg h-14 px-4 ${color}`}
      >
        {type}
      </div>
    )
  );
}
