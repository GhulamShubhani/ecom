"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { useProduct } from "../product/product-context";
import { useCart } from "./cart-context";
import { startTransition, useActionState, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Check, ShoppingBag } from "lucide-react";
import { addItem } from "./actions";

type ButtonState = "idle" | "loading" | "success";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  state,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  state: ButtonState;
}) {
  const baseClasses =
    "relative flex w-full items-center justify-center gap-2 rounded-full p-4 text-sm font-semibold tracking-wide transition-all duration-300";

  if (!availableForSale) {
    return (
      <button
        disabled
        className={clsx(
          baseClasses,
          "cursor-not-allowed border border-neutral-700 bg-neutral-900 text-neutral-500"
        )}
      >
        Out of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(
          baseClasses,
          "cursor-not-allowed border border-neutral-700 bg-neutral-900 text-neutral-400 opacity-70"
        )}
      >
        <ShoppingBag className="h-4 w-4" />
        Select an option
      </button>
    );
  }

  if (state === "loading") {
    return (
      <button
        disabled
        className={clsx(
          baseClasses,
          "cursor-wait border border-neutral-700 bg-neutral-900 text-neutral-300"
        )}
      >
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-[blink_1.4s_both_infinite_0ms] rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-[blink_1.4s_both_infinite_200ms] rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-[blink_1.4s_both_infinite_400ms] rounded-full bg-current" />
        </span>
      </button>
    );
  }

  if (state === "success") {
    return (
      <button
        disabled
        className={clsx(
          baseClasses,
          "animate-atc-bounce border border-green-500/40 bg-green-600/90 text-white"
        )}
      >
        <Check className="animate-atc-check h-4 w-4" strokeWidth={2.5} />
        Added to Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(
        baseClasses,
        "border border-brand-red bg-brand-red text-white hover:bg-[#b30000] hover:border-[#b30000]"
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      Add to Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const { variants, availableForSale } = product;
  const { addCartItem, openCart } = useCart();
  const { state } = useProduct();
  const [message, addItemAction] = useActionState(addItem, null);
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((v) => v.id === selectedVariantId);

  const handleAddToCart = async () => {
    if (!finalVariant || !selectedVariantId || buttonState !== "idle") return;

    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    setButtonState("loading");

    startTransition(() => {
      addCartItem(finalVariant, product);
    });

    await addItemAction(selectedVariantId);

    setButtonState("success");
    openCart();
    router.refresh();

    successTimerRef.current = setTimeout(() => {
      setButtonState("idle");
    }, 1600);
  };

  return (
    <form action={handleAddToCart}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        state={buttonState}
      />
      {message && buttonState === "idle" ? (
        <p className="mt-2 text-center text-sm text-red-400" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
