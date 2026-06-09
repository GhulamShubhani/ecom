import clsx from "clsx";
import Price from "./price";

export default function Label({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 srccontainer/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex items-center rounded-full border border-brand-clay/25 bg-brand-oatmilk/85 p-1 text-xs font-semibold text-brand-burgundy shadow-[0_18px_45px_-35px_rgba(74,21,37,0.55)] backdrop-blur-md">
        <h3 className="font-cormorant mr-4 line-clamp-2 flex-grow pl-3 text-base leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-brand-burgundy px-3 py-2 text-brand-oatmilk"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden src[275px]/label:inline"
        />
      </div>
    </div>
  );
}