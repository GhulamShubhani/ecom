"use client";

import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
};

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, quantity - 1));
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <span className="font-jakarta text-[11px] font-semibold tracking-[0.32em] text-brand-burgundy/55 uppercase">
        Quantity
      </span>
      <div
        className={clsx(
          "inline-flex h-11 w-fit items-center rounded-full border border-brand-clay/25 bg-white",
          disabled && "opacity-50"
        )}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={disabled || quantity <= min}
          onClick={decrease}
          className="flex h-full w-11 items-center justify-center rounded-l-full text-brand-burgundy transition-colors hover:bg-brand-sand disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span
          aria-live="polite"
          className="min-w-10 text-center font-jakarta text-sm font-semibold text-brand-burgundy"
        >
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={disabled || quantity >= max}
          onClick={increase}
          className="flex h-full w-11 items-center justify-center rounded-r-full text-brand-burgundy transition-colors hover:bg-brand-sand disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
