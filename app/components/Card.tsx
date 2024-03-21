interface ICard {
  title: string;
  value: number;
  moneySymbol: boolean;
  color: boolean;
}

export default function Card({ title, value, moneySymbol, color }: ICard) {
  let textcolor = "text-slate-600";
  if (color) {
    textcolor = value > 0 ? "text-green-500" : "text-red-500";
  }
  return (
    <div className="py-6 px-8 rounded-lg flex flex-col gap-[0.2rem]">
      <span className="text-[0.8rem] font-normal text-slate-500 uppercase">
        {title}
      </span>
      <span className={`font-medium text-xl tracking-wider ${textcolor}`}>
        {moneySymbol && (
          <span className="text-orange-500 font-light pr-[0.2rem]">$</span>
        )}
        {value}
      </span>
    </div>
  );
}
