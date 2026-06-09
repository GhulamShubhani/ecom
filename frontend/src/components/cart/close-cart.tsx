import { X } from 'lucide-react';
import clsx from 'clsx';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="cart-close-btn">
      <X
        className={clsx(
          'h-5 w-5 transition-all ease-in-out',
          className
        )}
      />
    </div>
  );
}
