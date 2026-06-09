"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "./product-context";

export function useSelectedVariant(product: Product): ProductVariant | undefined {
  const { state } = useProduct();

  return (
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    ) ?? (product.variants.length === 1 ? product.variants[0] : undefined)
  );
}

export function getDefaultVariant(product: Product): ProductVariant | undefined {
  return (
    product.variants.find((variant) => variant.availableForSale) ??
    product.variants[0]
  );
}

export function formatVariantLabel(variant: ProductVariant | undefined): string {
  if (!variant) return "Select options";
  if (variant.title === "Default Title") return "";
  return variant.selectedOptions.map((option) => option.value).join(" · ");
}
