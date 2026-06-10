"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";

type Props = {
  product: Product;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group hover-lift relative overflow-hidden rounded-3xl border border-brand-clay/15 bg-white shadow-[0_28px_60px_-45px_rgba(74,21,37,0.45)]">
      {/* Clickable area → product details page */}
      <Link
        href={product.href}
        aria-label={`View ${product.name}`}
        className="block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-clay/60"
      >
        <div className="relative aspect-square overflow-hidden bg-linear-to-br from-brand-sand to-brand-oatmilk">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width:768px) 25vw, 50vw"
            className="object-contain  transition-transform duration-500 ease-soft group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full border border-brand-champagne/40 bg-brand-night/70 px-3 py-1.5 font-jakarta text-[10px] font-semibold tracking-[0.24em] text-brand-champagne uppercase backdrop-blur">
            {product.badge}
          </span>
        </div>

        <div className="px-5 pt-5">
          <p className="mb-2 font-jakarta text-[10px] font-semibold tracking-[0.26em] text-brand-clay uppercase">
            {product.category}
          </p>
          <h3 className="font-cormorant mb-3 line-clamp-2 text-xl leading-tight font-medium text-brand-burgundy transition-colors group-hover:text-brand-clay md:text-2xl">
            {product.name}
          </h3>
          <div className="mb-3 flex items-center gap-1 font-jakarta text-xs text-brand-burgundy/45">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={`${product.id}-star-${idx}`}
                className="h-3 w-3 fill-brand-champagne text-brand-champagne"
              />
            ))}
            <span className="ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-lg font-semibold text-brand-burgundy">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="font-jakarta text-sm text-brand-burgundy/35 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      {/* Wishlist — overlays the image but is not inside the navigation link */}
      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-clay/20 bg-white/75 text-brand-burgundy/55 backdrop-blur transition-colors hover:border-brand-clay hover:text-brand-clay"
      >
        <Heart className="h-4 w-4" />
      </button>

      {/* Add to Cart — separate from the navigation link */}
      <div className="px-5 pb-5">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
