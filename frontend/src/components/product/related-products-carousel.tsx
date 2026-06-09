"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GridTileImage } from "../grid/tile";
import type { Product } from "@/lib/shopify/types";

type Props = {
  products: Product[];
  visibleCount?: number;
};

export default function RelatedProductsCarousel({
  products,
  visibleCount = 4,
}: Props) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, products.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * direction, behavior: "smooth" });
  };

  if (!products.length) return null;

  const itemBasis = `calc((100% - ${(visibleCount - 1) * 16}px) / ${visibleCount})`;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="Previous related products"
        disabled={!canScrollLeft}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/90 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:cursor-not-allowed disabled:opacity-0"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="Next related products"
        disabled={!canScrollRight}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/90 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:cursor-not-allowed disabled:opacity-0"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <ul
        ref={scrollerRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pt-1"
      >
        {products.map((product) => (
          <li
            key={product.handle}
            className="aspect-square flex-none snap-start"
            style={{ width: itemBasis }}
          >
            <Link
              className="relative block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
