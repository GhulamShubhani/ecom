"use client";

import { CartItem } from "@/lib/shopify/types";
import { X } from "lucide-react";
import { startTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "./actions";
import { useCart } from "./cart-context";

type OptimisticCartUpdate = (
  merchandiseId: string,
  updateType: "plus" | "minus" | "delete"
) => void;

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: OptimisticCartUpdate;
}) {
  const router = useRouter();
  const { showCartToast } = useCart();
  const [message, formAction] = useActionState(removeItem, null);
  const merchandiseId = item.merchandise.id;
  const payload = { merchandiseId, lineId: item.id };

  return (
    <form
      action={async () => {
        startTransition(() => {
          optimisticUpdate(merchandiseId, "delete");
        });

        await formAction(payload);
        router.refresh();
        showCartToast("removed");
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-clay/25 bg-white text-brand-burgundy/45 transition-colors hover:border-brand-burgundy hover:text-brand-burgundy"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      {message ? (
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
