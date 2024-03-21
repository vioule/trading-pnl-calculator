"use client";
import { switchType } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import { selectTypeById } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";

interface IType {
  id: string;
}

export default function Type({ id }: IType) {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => selectTypeById(state, id));
  const icon =
    type === "buy" ? (
      <MdOutlineArrowDropUp size={20} className="text-green-500" />
    ) : (
      <MdOutlineArrowDropDown size={20} className="text-red-500" />
    );
  const description =
    type === "buy" ? (
      <span className="bg-green-50 px-4 text-green-500 border-[1px] rounded-md border-green-300 flex items-center">
        Buy
      </span>
    ) : (
      <span className="bg-red-50 px-4 py-2 text-red-500 border-[1px] rounded-md border-red-300 flex items-center">
        Sell
      </span>
    );
  return (
    <div className="w-full h-full flex gap-2">
      <button
        className="px-2 rounded-md hover:bg-slate-100 bg-slate-50"
        onClick={() => dispatch(switchType(id))}
      >
        {icon}
      </button>
      {description}
    </div>
  );
}
