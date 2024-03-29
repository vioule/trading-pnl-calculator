"use client";
import {
  updateTrade,
  deleteTrade,
  incrementPrice,
  decrementPrice,
  incrementAmount,
  decrementAmount,
} from "@/lib/features/trades/tradesSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { TradeState } from "@/lib/features/trades/tradesSlice";
import Type from "./Type";
import InputNumber from "./InputNumber";
import { MdDelete } from "react-icons/md";

interface ITrade {
  data: TradeState;
  pnl: number;
}

export default function Trade({ data, pnl }: ITrade) {
  const dispatch = useAppDispatch();
  return (
    <tr className="w-full flex flex-row text-xs text-slate-500 tracking-wide border-b-[1px] last:border-none p-2 gap-2">
      <td className="w-[22.5%] text-left font-semibold">
        <Type id={data.id} />
      </td>
      <td className="relative w-[22.5%] text-left font-semibold">
        <InputNumber
          onChange={(e) => {
            dispatch(
              updateTrade({
                ...data,
                price: e.target.value,
              })
            );
          }}
          onIncrement={() => {
            dispatch(incrementPrice(data.id));
          }}
          onDecrement={() => {
            dispatch(decrementPrice(data.id));
          }}
          value={data.price}
        />
        <span className="absolute left-[0.3rem] top-0 h-full flex items-center text-orange-500 font-light text-sm">
          $
        </span>
      </td>
      <td className="w-[22.5%] text-left font-semibold">
        <InputNumber
          onChange={(e) => {
            dispatch(
              updateTrade({
                ...data,
                amount: e.target.value,
              })
            );
          }}
          onIncrement={() => {
            dispatch(incrementAmount(data.id));
          }}
          onDecrement={() => {
            dispatch(decrementAmount(data.id));
          }}
          value={data.amount}
        />
      </td>
      <td className="w-[22.5%] text-left font-medium flex items-center text-sm">
        <span className={`${pnl > 0 ? "text-green-500" : "text-red-500"}`}>
          {pnl ? (
            <>
              <span className="text-orange-500 font-light pr-[0.1rem]">$</span>
              {parseFloat(pnl.toFixed(2))}
            </>
          ) : null}
        </span>
      </td>
      <td className="w-[10%] flex">
        <button
          onClick={() => dispatch(deleteTrade(data.id))}
          className="bg-slate-50 px-4 rounded-md hover:bg-red-100 hover:text-red-500"
        >
          <span className=" max-sm:hidden">Delete trade</span>
          <MdDelete className="hidden max-sm:block" />
        </button>
      </td>
    </tr>
  );
}
