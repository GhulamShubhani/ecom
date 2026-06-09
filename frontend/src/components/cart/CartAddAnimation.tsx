"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, ShoppingCart } from "lucide-react";

interface Props {
  /** While true the animation plays; parent sets it false to destroy */
  visible: boolean;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function CartAddAnimationContent() {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("out"), 1350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-live="polite"
      aria-label="Item added to cart"
      className={`fixed inset-0 z-9999 flex items-center justify-center ${
        phase === "in" ? "atc-overlay-in" : "atc-overlay-out"
      }`}
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className={`relative flex flex-col items-center gap-5 rounded-2xl border-2 border-brand-red/60 bg-[#141414] px-12 py-10 text-center shadow-2xl atc-card-in atc-card-glow`}
      >
        <div className="absolute inset-0 rounded-2xl bg-brand-red/5 pointer-events-none" />

        <div
          className="absolute left-1/2 top-2 h-5 w-5 rounded-full bg-brand-red shadow-[0_0_12px_rgba(204,0,0,0.8)] atc-item-fly"
          style={{ transform: "translateX(-50%)" }}
        />

        <div className="relative mt-2">
          <div className="atc-cart-wiggle">
            <ShoppingCart
              className="h-20 w-20 text-brand-red"
              strokeWidth={1.25}
            />
          </div>

          <div
            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-green-400 to-green-600 shadow-lg atc-badge-in"
            style={{ opacity: 0 }}
          >
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-1 atc-text-in" style={{ opacity: 0 }}>
          <p className="text-xl font-bold tracking-tight text-white">
            Added to Cart
          </p>
        </div>
        <p className="text-sm text-neutral-400 atc-sub-in" style={{ opacity: 0 }}>
          Item added to your bag ✦
        </p>

        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />
      </div>
    </div>
  );
}

/**
 * Full-screen centered overlay that plays when an item is added to cart.
 * Uses only CSS keyframe animations — no Lottie / Framer Motion needed.
 */
export function CartAddAnimation({ visible }: Props) {
  const isClient = useIsClient();

  if (!isClient || !visible) return null;

  return createPortal(<CartAddAnimationContent />, document.body);
}
