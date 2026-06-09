"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import { startTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { addItem } from "./actions";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  compact = false,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  compact?: boolean;
}) {
  const buttonClasses = compact
    ? "relative flex w-full items-center justify-center rounded-full bg-brand-burgundy px-4 py-2.5 font-jakarta text-[10px] font-semibold uppercase tracking-wider2 text-brand-oatmilk transition-all duration-300 ease-soft hover:bg-[#3a0f1d]"
    : "relative flex w-full items-center justify-center rounded-full bg-brand-burgundy p-4 font-jakarta text-xs font-semibold uppercase tracking-wider2 text-brand-oatmilk transition-all duration-300 ease-soft hover:bg-[#3a0f1d]";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <Plus className="h-5" />
        </div>
        Add to Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      <div className="absolute left-0 ml-4">
        <Plus className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  product,
  quantity = 1,
  compact = false,
}: {
  product: Product;
  quantity?: number;
  compact?: boolean;
}) {
  const router = useRouter();
  const { variants, availableForSale } = product;
  const { addCartItem, openCart, triggerAddedAnimation, showCartToast } = useCart();
  const { state } = useProduct();
  const [message, addItemAction] = useActionState(addItem, null);
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  return (
    <form
      action={async () => {
        if (!finalVariant || !selectedVariantId) return;

        startTransition(() => {
          for (let i = 0; i < quantity; i += 1) {
            addCartItem(finalVariant, product);
          }
        });
        triggerAddedAnimation();
        showCartToast("added");

        await addItemAction({ selectedVariantId, quantity });
        openCart();
        router.refresh();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        compact={compact}
      />
      {message ? (
        <p className="mt-2 text-center font-jakarta text-sm text-brand-burgundy" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}