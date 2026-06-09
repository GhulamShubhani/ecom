"use client";

import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

const WISHLIST_KEY = "playme-wishlist";

function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveWishlist(handles: string[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(handles));
  window.dispatchEvent(new CustomEvent("wishlist-updated"));
}

type Props = {
  productHandle: string;
  compact?: boolean;
};

export function AddToWishlist({ productHandle, compact = false }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const syncFromStorage = useCallback(() => {
    setIsWishlisted(getWishlist().includes(productHandle));
  }, [productHandle]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
      syncFromStorage();
    }, 0);
    window.addEventListener("wishlist-updated", syncFromStorage);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wishlist-updated", syncFromStorage);
    };
  }, [syncFromStorage]);

  function toggleWishlist() {
    const list = getWishlist();
    const next = list.includes(productHandle)
      ? list.filter((h) => h !== productHandle)
      : [...list, productHandle];
    saveWishlist(next);
    setIsWishlisted(next.includes(productHandle));
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={mounted ? isWishlisted : false}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border font-jakarta font-medium tracking-wide transition-colors",
        compact
          ? "h-11 w-11"
          : "px-6 py-4 text-sm",
        isWishlisted
          ? "border-brand-clay bg-brand-clay/15 text-brand-burgundy"
          : "border-brand-clay/30 bg-white text-brand-burgundy/70 hover:border-brand-clay hover:text-brand-burgundy"
      )}
    >
      <Heart
        className={clsx("shrink-0", compact ? "h-5 w-5" : "h-5 w-5")}
        strokeWidth={1.5}
        fill={mounted && isWishlisted ? "currentColor" : "none"}
      />
      {!compact ? (
        <span className="hidden sm:inline">
          {mounted && isWishlisted ? "Wishlisted" : "Wishlist"}
        </span>
      ) : null}
    </button>
  );
}
