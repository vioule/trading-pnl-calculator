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
  const color = type === "buy" ? "bg-green-500" : "bg-red-500";
  return (
    <div className="w-full h-full flex gap-2">
      <button
        className="px-2 rounded-md hover:bg-slate-100 bg-slate-50"
        onClick={() => dispatch(switchType(id))}
      >
        {icon}
      </button>
      <span
        className={`${color} px-4 py-2 text-white rounded-md flex items-center capitalize`}
      >
        {type}
      </span>
    </div>
  );
}
