'use client';

import { useEffect, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from './cart-context';

const VISIBLE_MS = 1700;

/**
 * Full-screen, centered celebration that plays whenever an item is added to
 * the cart. Styled in the Apni Dukan brand palette. Rendered once near the
 * root and driven by the cart context.
 */
export default function AddToCartAnimation() {
  const { addedAnimationKey } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (addedAnimationKey === 0) return;

    // Respect users who prefer less motion — skip the celebration entirely.
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const showTimer = window.setTimeout(() => setShow(true), 0);
    const hideTimer = window.setTimeout(() => setShow(false), VISIBLE_MS);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [addedAnimationKey]);

  if (!show) return null;

  return (
    <div
      // Re-mount on every add so the CSS animations replay from the start.
      key={addedAnimationKey}
      className="pointer-events-none fixed inset-0 z-120 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      {/* Soft dimmed backdrop */}
      <div className="animate-cart-overlay-fade absolute inset-0 bg-brand-black/55 backdrop-blur-[2px]" />

      {/* Card */}
      <div className="animate-added-pop relative flex flex-col items-center gap-4 rounded-3xl border border-brand-red/30 bg-brand-charcoal/95 px-10 py-9 shadow-[0_25px_80px_-20px_rgba(255,23,68,0.55)]">
        {/* Animated badge */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Expanding glow rings */}
          <span className="animate-cart-ring absolute inset-0 rounded-full border-2 border-brand-red/70" />
          <span className="animate-cart-ring-2 absolute inset-0 rounded-full border-2 border-brand-neon/60" />

          {/* Bag + tick */}
          <div className="animate-cart-pop flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-brand-red to-brand-neon shadow-[0_0_30px_rgba(255,23,68,0.55)]">
            <ShoppingBag className="h-9 w-9 text-white" strokeWidth={2.2} />
          </div>

          <span className="animate-check-pop absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-charcoal bg-white">
            <Check className="h-5 w-5 text-brand-red" strokeWidth={3.5} />
          </span>
        </div>

        <div className="text-center">
          <p className="font-heading text-xl font-semibold tracking-wide text-white">
            Added to cart
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-brand-red">
            Successfully added
          </p>
        </div>
      </div>
    </div>
  );
}
