import { ShoppingCart } from 'lucide-react';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-clay/25 text-brand-burgundy transition-colors hover:border-brand-clay hover:bg-brand-sand/60">
      <ShoppingCart
        className={clsx(
          'h-4 transition-all ease-in-out hover:scale-110',
          className
        )}
      />

      {quantity ? (
        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-champagne text-[10px] font-bold text-brand-night">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
