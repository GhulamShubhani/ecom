"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import Price from "../price";
import { cn } from "@/lib/utils";

type BundleProductCardProps = {
  product: Product;
  variant: ProductVariant | undefined;
  selected: boolean;
  onToggle: (selected: boolean) => void;
  isMain?: boolean;
};

export function BundleProductCard({
  product,
  variant,
  selected,
  onToggle,
  isMain = false,
}: BundleProductCardProps) {
  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const available = variant?.availableForSale ?? product.availableForSale;
  const image = product.featuredImage;

  return (
    <article
      className={cn(
        "group relative flex w-full min-w-0 flex-col overflow-hidden rounded-3xl border bg-white/80 shadow-[0_20px_50px_-40px_rgba(74,21,37,0.45)] transition-all duration-300",
        selected
          ? "border-brand-burgundy/25 ring-1 ring-brand-burgundy/10"
          : "border-brand-clay/15 opacity-75 hover:opacity-100",
        !available && "opacity-50"
      )}
    >
      <label className="flex cursor-pointer flex-col">
        <div className="absolute top-3 right-3 z-10">
          <input
            type="checkbox"
            checked={selected}
            disabled={!available}
            onChange={(event) => onToggle(event.target.checked)}
            className="peer sr-only"
            aria-label={`Include ${product.title} in bundle`}
          />
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md border transition-all duration-200",
              selected
                ? "border-brand-burgundy bg-brand-burgundy text-brand-oatmilk"
                : "border-brand-clay/30 bg-white text-transparent group-hover:border-brand-clay"
            )}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </div>

        {isMain ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-sand">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
          </div>
        ) : (
          <Link
            href={`/product/${product.handle}`}
            className="relative aspect-[4/3] overflow-hidden bg-brand-sand"
          >
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
          </Link>
        )}

        <div className="flex flex-1 flex-col gap-2 p-4">
          {isMain ? (
            <h3 className="font-cormorant line-clamp-2 pr-8 text-lg leading-snug font-medium text-brand-burgundy">
              {product.title}
            </h3>
          ) : (
            <Link href={`/product/${product.handle}`} className="group/link">
              <h3 className="font-cormorant line-clamp-2 pr-8 text-lg leading-snug font-medium text-brand-burgundy transition-colors group-hover/link:text-brand-clay">
                {product.title}
              </h3>
            </Link>
          )}

          {variant && variant.title !== "Default Title" ? (
            <p className="font-jakarta text-[11px] tracking-wide text-brand-burgundy/50 uppercase">
              {variant.selectedOptions.map((o) => o.value).join(" · ")}
            </p>
          ) : null}

          <Price
            amount={price.amount}
            currencyCode={price.currencyCode}
            className="mt-auto text-base font-semibold"
            currencyCodeClassName="hidden"
          />

          {!available ? (
            <p className="font-jakarta text-[11px] text-brand-burgundy/45">
              {!variant ? "Select options above" : "Out of stock"}
            </p>
          ) : null}
        </div>
      </label>
    </article>
  );
}
