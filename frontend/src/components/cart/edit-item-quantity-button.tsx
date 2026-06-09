"use client";

import { CartItem } from "@/lib/shopify/types";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";
import { startTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateItemQuantity } from "./actions";
import { useCart } from "./cart-context";

type OptimisticCartUpdate = (
  merchandiseId: string,
  updateType: "plus" | "minus" | "delete"
) => void;

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 text-brand-burgundy transition-all duration-200 hover:bg-brand-clay/15 hover:text-brand-clay",
        {
          "ml-auto": type === "minus",
        }
      )}
    >
      {type === "plus" ? (
        <Plus className="h-4 w-4" />
      ) : (
        <Minus className="h-4 w-4" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: OptimisticCartUpdate;
}) {
  const router = useRouter();
  const { showCartToast } = useCart();
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };

  return (
    <form
      action={async () => {
        startTransition(() => {
          optimisticUpdate(payload.merchandiseId, type);
        });

        await formAction(payload);
        router.refresh();

        if (type === "minus" && payload.quantity === 0) {
          showCartToast("removed");
        }
      }}
    >
      <SubmitButton type={type} />
      <p aria-label="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}