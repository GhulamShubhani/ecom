"use server";

import { TAGS } from "@/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItems(
  prevState: unknown,
  payload: { items: { selectedVariantId: string; quantity?: number }[] }
) {
  const items = payload.items.filter((item) => item.selectedVariantId);
  if (!items.length) {
    return "Error adding items to cart";
  }

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  try {
    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id!;
      cookieStore.set("cartId", cartId);
    }

    await addToCart(
      cartId,
      items.map((item) => ({
        merchandiseId: item.selectedVariantId,
        quantity: item.quantity ?? 1,
      }))
    );
    revalidateTag(TAGS.cart, "max");
  } catch (error) {
    console.error("addItems failed:", error);
    return "Error adding items to cart";
  }
}

export async function addItem(
  prevState: unknown,
  payload:
    | string
    | undefined
    | { selectedVariantId: string; quantity?: number }
) {
  const selectedVariantId =
    typeof payload === "string" ? payload : payload?.selectedVariantId;
  const quantity =
    typeof payload === "object" && payload?.quantity ? payload.quantity : 1;

  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  try {
    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id!;
      cookieStore.set("cartId", cartId);
    }

    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity },
    ]);
    revalidateTag(TAGS.cart, "max");
  } catch (error) {
    console.error("addItem failed:", error);
    return "Error adding item to cart";
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  if (!cartId) {
    return "Missing cart ID";
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart, "max");
  } catch (error) {
    console.error(error);
    return "Error updating item quantity";
  }
}

export async function removeItem(
  prevState: unknown,
  payload: string | { merchandiseId: string; lineId?: string }
) {
  const merchandiseId =
    typeof payload === "string" ? payload : payload.merchandiseId;
  const lineId = typeof payload === "object" ? payload.lineId : undefined;

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem =
      (lineId ? cart.lines.find((line) => line.id === lineId) : undefined) ??
      cart.lines.find((line) => line.merchandise.id === merchandiseId);

    if (lineItem?.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart, "max");
      return;
    }

    return "Item not found in cart";
  } catch (error) {
    console.error("removeItem failed:", error);
    return "Error removing item from cart";
  }
}

export async function redirectToCheckout(): Promise<void> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    console.error("redirectToCheckout: missing cart ID");
    return;
  }

  const cart = await getCart(cartId);

  if (!cart) {
    console.error("redirectToCheckout: error fetching cart");
    return;
  }

  redirect(cart.checkoutUrl);
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  const cookieStore = await cookies();
  cookieStore.set("cartId", cart.id!);
}