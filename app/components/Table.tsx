import { selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";
import Trade from "./Trade";

interface ITable {
  pnls: number[];
}

export default function Table({ pnls }: ITable) {
  const trades = useAppSelector(selectTrades);

  return (
    <table className="w-full flex flex-col border-[1px] rounded-md border-slate-200 bg-white">
      <thead className="">
        <tr className="w-full flex flex-row text-xs text-slate-500 border-b-[1px] p-4 gap-2">
          <th scope="col" className="w-[22.5%] text-left font-medium">
            Type
          </th>
          <th scope="col" className="w-[22.5%] text-left font-medium">
            Price
          </th>
          <th scope="col" className="w-[22.5%] text-left font-medium">
            Amount
          </th>
          <th scope="col" className="w-[22.5%] text-left font-medium">
            Pnl
          </th>
          <th className="w-[10%]"></th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, i) => (
          <Trade data={trade} key={trade.id} pnl={pnls[i]} />
        ))}
      </tbody>
    </table>
  );
}
