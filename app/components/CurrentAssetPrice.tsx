import { useEffect, useRef, useState } from "react";
import {
  decrementCurrentPrice,
  incrementCurrentPrice,
  selectCurrentPrice,
  updateCurrentPrice,
} from "@/lib/features/currentPrice/currentPriceSlice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function CurrentAssetPrice() {
  const dispatch = useAppDispatch();
  const currentPrice = useAppSelector(selectCurrentPrice);
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
    <div className="py-6 px-8 rounded-lg flex flex-col gap-[0.2rem]">
      <label
        className="text-[0.8rem] font-normal text-slate-500 uppercase"
        htmlFor="currentAssetPrice"
      >
        Current asset price
      </label>
      <div
        className="relative flex max-w-[200px]"
        ref={ref}
        onFocus={() => {
          setIsActive(true);
        }}
      >
        <input
          type="number"
          className={`rounded-md px-2 pl-[1.25rem] focus:outline-none w-full font-medium text-xl tracking-wider text-black ${
            isActive ? "bg-orange-100 " : "bg-orange-50 "
          }`}
          onChange={(e) => dispatch(updateCurrentPrice(e.target.value))}
          value={currentPrice}
          id="currentAssetPrice"
        />
        <span className="absolute left-[0.3rem] top-0 h-full flex items-center text-orange-500 font-light text-lg">
          $
        </span>
        <div className="absolute flex flex-col right-0 h-full justify-between pr-1">
          {isActive && (
            <>
              <IoIosArrowUp
                size={14}
                className="hover:cursor-pointer"
                onClick={() => dispatch(incrementCurrentPrice())}
              />
              <IoIosArrowDown
                size={14}
                className="hover:cursor-pointer"
                onClick={() => dispatch(decrementCurrentPrice())}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
