import { selectTrades } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";
import Trade from "./Trade";

interface ITable {
  pnls: number[];
}

export default function Table({ pnls }: ITable) {
  const trades = useAppSelector(selectTrades);

  return (
    <table className="w-full flex flex-col border-[1px] rounded-md border-slate-200">
      <thead className="">
        <tr className="w-full flex flex-row text-xs text-slate-500 tracking-wide border-b-[1px] p-4 gap-2">
          <th scope="col" className="w-[22.5%] text-left font-semibold">
            Type
          </th>
          <th scope="col" className="w-[22.5%] text-left font-semibold">
            Price
          </th>
          <th scope="col" className="w-[22.5%] text-left font-semibold">
            Amount
          </th>
          <th scope="col" className="w-[22.5%] text-left font-semibold">
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
