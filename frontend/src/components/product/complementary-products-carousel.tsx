"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import Price from "../price";
import { addItem } from "../cart/actions";
import { useCart } from "../cart/cart-context";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Props = {
  products: Product[];
  title?: string;
  visibleCount?: number;
};

function getDefaultVariant(product: Product) {
  return (
    product.variants.find((variant) => variant.availableForSale) ??
    product.variants[0]
  );
}

function RecommendationCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addCartItem, openCart, triggerAddedAnimation, showCartToast } = useCart();
  const variant = getDefaultVariant(product);
  const canAdd = Boolean(variant?.availableForSale);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brand-clay/15 bg-white/80 shadow-[0_20px_50px_-40px_rgba(74,21,37,0.45)]">
      <Link
        href={`/product/${product.handle}`}
        className="group relative aspect-square overflow-hidden bg-brand-sand"
      >
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 70vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/product/${product.handle}`} className="group">
          <h3 className="font-cormorant line-clamp-2 text-xl leading-snug font-medium text-brand-burgundy transition-colors group-hover:text-brand-clay">
            {product.title}
          </h3>
        </Link>
        <Price
          amount={product.priceRange.minVariantPrice.amount}
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          className="text-sm font-semibold"
          currencyCodeClassName="hidden"
        />
        <form
          className="mt-auto"
          action={async () => {
            if (!variant?.id || !canAdd) return;

            startTransition(() => {
              addCartItem(variant, product);
            });
            triggerAddedAnimation();
            showCartToast("added");
            await addItem(null, { selectedVariantId: variant.id, quantity: 1 });
            openCart();
            router.refresh();
          }}
        >
          <button
            type="submit"
            disabled={!canAdd}
            className={clsx(
              "flex w-full items-center justify-center gap-2 rounded-full bg-brand-burgundy px-4 py-3 font-jakarta text-[11px] font-semibold tracking-wider2 text-brand-oatmilk uppercase transition-all duration-300 hover:bg-[#3a0f1d] disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <Plus className="h-4 w-4" />
            {canAdd ? "Add to Cart" : "Sold Out"}
          </button>
        </form>
      </div>
    </article>
  );
}

export default function ComplementaryProductsCarousel({
  products,
  title = "Frequently Bought Together",
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
    <section className="py-16 md:py-20" aria-labelledby="complementary-heading">
      <p className="mb-3 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
        Curated Pairings
      </p>
      <h2
        id="complementary-heading"
        className="font-cormorant mb-8 text-4xl font-medium text-brand-burgundy md:text-5xl"
      >
        {title}
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous products"
          disabled={!canScrollLeft}
          className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/90 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:cursor-not-allowed disabled:opacity-0 md:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next products"
          disabled={!canScrollRight}
          className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/90 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:cursor-not-allowed disabled:opacity-0 md:inline-flex"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <ul
          ref={scrollerRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pt-1 md:gap-5"
        >
          {products.map((product) => (
            <li
              key={product.handle}
              className="w-[min(280px,78vw)] flex-none snap-start md:w-auto"
              style={{ flexBasis: itemBasis, maxWidth: itemBasis }}
            >
              <RecommendationCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
