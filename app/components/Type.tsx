"use client";
import { switchType } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { selectTypeById } from "@/lib/features/trades/tradesSlice";
import { useAppSelector } from "@/lib/hooks";

interface IType {
  id: string;
}

export default function Type({ id }: IType) {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => selectTypeById(state, id));
  const color =
    type === "buy"
      ? "bg-green-500 hover:bg-green-600"
      : "bg-red-500 hover:bg-red-600";
  return (
    <div className="w-full h-full flex gap-2">
      <button onClick={() => dispatch(switchType(id))}>
        <span
          className={`${color} px-4 py-2 text-white rounded-md flex items-center capitalize`}
        >
          {type}
        </span>
      </button>
    </div>
  );
}
