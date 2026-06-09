"use client";

import { ShoppingBag } from "lucide-react";
import Price from "../price";
import { cn } from "@/lib/utils";

type BundlePriceSummaryProps = {
  totalAmount: string;
  currencyCode: string;
  itemCount: number;
  disabled: boolean;
  isPending: boolean;
  onAddToCart: () => void;
};

export function BundlePriceSummary({
  totalAmount,
  currencyCode,
  itemCount,
  disabled,
  isPending,
  onAddToCart,
}: BundlePriceSummaryProps) {
  return (
    <div className="flex w-full flex-col justify-center rounded-3xl border border-brand-clay/15 bg-white/80 p-6 shadow-[0_20px_50px_-40px_rgba(74,21,37,0.45)] lg:w-72 lg:shrink-0 xl:w-80">
      <p className="font-jakarta text-[11px] font-semibold tracking-[0.35em] text-brand-champagne uppercase">
        Bundle Total
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-jakarta text-sm text-brand-burgundy/55">Total:</span>
        <Price
          amount={totalAmount}
          currencyCode={currencyCode}
          className="font-cormorant text-3xl font-medium"
          currencyCodeClassName="hidden"
        />
      </div>

      <p className="mt-1 font-jakarta text-xs text-brand-burgundy/45">
        {itemCount} {itemCount === 1 ? "item" : "items"} selected
      </p>

      <button
        type="button"
        onClick={onAddToCart}
        disabled={disabled || isPending}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-burgundy px-6 py-4 font-jakarta text-xs font-semibold tracking-wider2 text-brand-oatmilk uppercase transition-all duration-300 ease-soft hover:bg-[#3a0f1d]",
          (disabled || isPending) && "cursor-not-allowed opacity-50 hover:bg-brand-burgundy"
        )}
      >
        <ShoppingBag className="h-4 w-4" />
        {isPending ? "Adding…" : "Add Selected To Cart"}
      </button>
    </div>
  );
}
