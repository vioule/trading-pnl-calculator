"use client";
import { updateTrade, deleteTrade } from "@/lib/features/trades/tradesSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { TradeState } from "@/lib/features/trades/tradesSlice";

interface ITrade {
  data: TradeState;
}

export default function Trade({ data }: ITrade) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex ">
      <label htmlFor={`type-${data.id}`}>Type</label>
      <select
        id={`type-${data.id}`}
        onChange={(e) =>
          dispatch(
            updateTrade({ ...data, type: e.target.value as "buy" | "sell" })
          )
        }
        value={data.type}
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <label htmlFor={`price-${data.id}`}>Price :</label>
      <input
        type="number"
        id={`price-${data.id}`}
        onChange={(e) =>
          dispatch(updateTrade({ ...data, price: parseFloat(e.target.value) }))
        }
        value={data.price}
      />
      <label htmlFor={`amount-${data.id}`}>Amount :</label>
      <input
        type="number"
        id={`amount-${data.id}`}
        onChange={(e) =>
          dispatch(updateTrade({ ...data, amount: parseFloat(e.target.value) }))
        }
        value={data.amount}
      />
      <button onClick={() => dispatch(deleteTrade(data.id))}>
        Delete trade
      </button>
    </div>
  );
}
