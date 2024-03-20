import { selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";
import Trade from "./Trade";

export default function Table() {
  const trades = useAppSelector(selectTrades);

  return (
    <table className="w-full flex flex-col border-[1px] rounded-md border-slate-200">
      <thead className="bg-slate-50">
        <tr className="w-full flex flex-row text-xs text-slate-400 tracking-wide border-b-[1px] p-4 gap-2">
          <th scope="col" className="w-[30%] text-left font-semibold">
            Type
          </th>
          <th scope="col" className="w-[30%] text-left font-semibold">
            Price
          </th>
          <th scope="col" className="w-[30%] text-left font-semibold">
            Amount
          </th>
          <th className="w-[10%]"></th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <Trade data={trade} key={trade.id} />
        ))}
      </tbody>
    </table>
  );
}
