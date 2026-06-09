"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "./product-context";
import { useCart } from "../cart/cart-context";
import { redirectToCheckout } from "../cart/actions";
import { addItem } from "../cart/actions";
import clsx from "clsx";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

type BuyNowButtonProps = {
  product: Product;
  quantity: number;
  className?: string;
};

export function BuyNowButton({ product, quantity, className }: BuyNowButtonProps) {
  const router = useRouter();
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId);
  const disabled =
    !availableForSale || !selectedVariantId || !finalVariant?.availableForSale;

  return (
    <form
      action={async () => {
        if (!finalVariant || !selectedVariantId || disabled) return;

        startTransition(() => {
          addCartItem(finalVariant, product);
        });

        await addItem(null, { selectedVariantId, quantity });
        await redirectToCheckout();
        router.refresh();
      }}
    >
      <button
        type="submit"
        disabled={disabled}
        aria-label="Buy now"
        className={clsx(
          "flex w-full items-center justify-center rounded-full border border-brand-burgundy bg-transparent px-6 py-4 font-jakarta text-xs font-semibold tracking-wider2 text-brand-burgundy uppercase transition-all duration-300 ease-soft hover:bg-brand-burgundy hover:text-brand-oatmilk disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        Buy Now
      </button>
    </form>
  );
}
