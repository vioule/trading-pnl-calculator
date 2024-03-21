import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface IInputNumber {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  value: string;
}

export default function InputNumber({
  onChange,
  onIncrement,
  onDecrement,
  value,
}: IInputNumber) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  const handleBlur = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      setIsActive(false);
    }
  };

  return (
    <div
      className="relative flex"
      ref={ref}
      onFocus={() => {
        setIsActive(true);
      }}
    >
      <input
        type="number"
        className={`rounded-sm p-2 pl-[0.9rem] focus:outline-none w-full h-10 text-sm font-normal ${
          isActive ? "bg-slate-50 " : ""
        }`}
        onChange={onChange}
        value={value}
      />
      <div className="absolute flex flex-col right-0 h-full justify-between pr-1">
        {isActive && (
          <>
            <IoIosArrowUp
              size={14}
              className="hover:cursor-pointer"
              onClick={onIncrement}
            />
            <IoIosArrowDown
              size={14}
              className="hover:cursor-pointer"
              onClick={onDecrement}
            />
          </>
        )}
      </div>
    </div>
  );
}
