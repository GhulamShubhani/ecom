"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import { AddToCart } from "../cart/add-to-cart";
import { useProduct } from "./product-context";
import {
  formatVariantLabel,
  useSelectedVariant,
} from "./use-selected-variant";
import Price from "../price";

type StickyAddToCartBarProps = {
  product: Product;
};

export function StickyAddToCartBar({ product }: StickyAddToCartBarProps) {
  const { quantity } = useProduct();
  const selectedVariant = useSelectedVariant(product);
  const variantLabel = formatVariantLabel(selectedVariant);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sentinels = document.querySelectorAll("[data-purchase-sentinel]");
    if (!sentinels.length) return;

    const visibility = new Map<Element, boolean>();

    const updateVisibility = () => {
      const anyIntersecting = Array.from(visibility.values()).some(Boolean);
      setIsVisible(!anyIntersecting);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting);
        });
        updateVisibility();
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    sentinels.forEach((el) => {
      visibility.set(el, false);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sticky-cart-offset",
      isVisible ? "4.75rem" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--sticky-cart-offset", "0px");
    };
  }, [isVisible]);

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const image = product.featuredImage;

  return (
    <>
      {/* Desktop: sticky top bar */}
      <div
        role="region"
        aria-label="Quick purchase"
        aria-hidden={!isVisible}
        className={cn(
          "fixed inset-x-0 top-[var(--navbar-height)] z-40 hidden border-b border-brand-clay/20 bg-white/95 shadow-[0_8px_32px_-12px_rgba(74,21,37,0.18)] backdrop-blur-xl transition-all duration-300 ease-soft lg:block",
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center gap-6 px-4 py-3 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {image?.url ? (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-brand-clay/15 bg-brand-sand">
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
            ) : null}
            <div className="min-w-0">
              <p className="font-cormorant truncate text-lg font-medium text-brand-burgundy">
                {product.title}
              </p>
              {variantLabel ? (
                <p className="font-jakarta truncate text-xs text-brand-burgundy/55">
                  {variantLabel}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <Price
              amount={price.amount}
              currencyCode={price.currencyCode}
              className="text-lg font-semibold"
              currencyCodeClassName="hidden"
            />
            <div className="w-44">
              <AddToCart product={product} quantity={quantity} compact />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: fixed bottom bar */}
      <div
        role="region"
        aria-label="Quick purchase"
        aria-hidden={!isVisible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-brand-clay/20 bg-brand-oatmilk/95 shadow-[0_-12px_40px_-20px_rgba(74,21,37,0.35)] backdrop-blur-xl transition-all duration-300 ease-soft lg:hidden",
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3">
          {image?.url ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-brand-clay/15 bg-brand-sand">
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                sizes="44px"
                className="object-contain p-1"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-cormorant truncate text-base font-medium text-brand-burgundy">
              {product.title}
            </p>
            <div className="flex items-center gap-2">
              <Price
                amount={price.amount}
                currencyCode={price.currencyCode}
                className="text-sm font-semibold"
                currencyCodeClassName="hidden"
              />
              {variantLabel ? (
                <span className="font-jakarta truncate text-[11px] text-brand-burgundy/50">
                  · {variantLabel}
                </span>
              ) : null}
            </div>
          </div>
          <div className="w-36 shrink-0">
            <AddToCart product={product} quantity={quantity} compact />
          </div>
        </div>
      </div>
    </>
  );
}
