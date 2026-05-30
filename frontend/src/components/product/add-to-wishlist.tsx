"use client";

import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

const WISHLIST_KEY = "apna-dukan-wishlist";

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
};

export function AddToWishlist({ productHandle }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const syncFromStorage = useCallback(() => {
    setIsWishlisted(getWishlist().includes(productHandle));
  }, [productHandle]);

  useEffect(() => {
    setMounted(true);
    syncFromStorage();
    window.addEventListener("wishlist-updated", syncFromStorage);
    return () => window.removeEventListener("wishlist-updated", syncFromStorage);
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
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-medium tracking-wide transition-colors",
        isWishlisted
          ? "border-red-300 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-500"
      )}
    >
      <Heart
        className="h-5 w-5"
        strokeWidth={1.5}
        fill={mounted && isWishlisted ? "currentColor" : "none"}
      />
      <span className="hidden sm:inline">
        {mounted && isWishlisted ? "Wishlisted" : "Wishlist"}
      </span>
    </button>
  );
}
