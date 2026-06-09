"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "./product-context";
import Price from "../price";
import clsx from "clsx";

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
}

export function ProductPrice({ product }: { product: Product }) {
  const { state } = useProduct();
  const { variants } = product;

  const selectedVariant =
    variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    ) ?? (variants.length === 1 ? variants[0] : undefined);

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice;
  const hasCompareAt =
    compareAt &&
    parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <Price
        amount={price.amount}
        currencyCode={price.currencyCode}
        className="font-jakarta text-2xl font-semibold md:text-[1.65rem]"
        currencyCodeClassName="hidden"
      />
      {hasCompareAt ? (
        <span className="font-jakarta text-base text-brand-burgundy/40 line-through">
          {formatMoney(compareAt.amount, compareAt.currencyCode)}
        </span>
      ) : null}
      {product.priceRange.minVariantPrice.amount !==
        product.priceRange.maxVariantPrice.amount &&
      !selectedVariant ? (
        <span className="font-jakarta text-sm text-brand-burgundy/50">
          From{" "}
          {formatMoney(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode
          )}
        </span>
      ) : null}
    </div>
  );
}

export function ProductAvailability({ product }: { product: Product }) {
  const { state } = useProduct();
  const { variants } = product;

  const selectedVariant =
    variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    ) ?? (variants.length === 1 ? variants[0] : undefined);

  const available =
    selectedVariant?.availableForSale ?? product.availableForSale;

  return (
    <p className="flex items-center gap-2 font-jakarta text-sm">
      <span
        className={clsx("h-2 w-2 rounded-full", {
          "bg-brand-sage": available,
          "bg-brand-clay/60": !available,
        })}
        aria-hidden
      />
      <span className={available ? "text-brand-burgundy/75" : "text-brand-burgundy/45"}>
        {available ? "In stock — ships within 1–3 days" : "Out of stock"}
      </span>
    </p>
  );
}
