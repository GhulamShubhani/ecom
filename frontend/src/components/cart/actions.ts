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

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined
) {
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
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart, "max");
  } catch (error) {
    console.error("addItem failed:", error);
    return "Error adding item to cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
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

export async function removeItem(prevState: any, merchandiseId: string) {
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

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart, "max");
    } else {
      return "Item not found in cart";
    }
  } catch (error) {
    return "Error removing item from cart";
  }
}

export async function redirectToCheckout(_formData?: FormData): Promise<void> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    console.error("redirectToCheckout: missing cart ID");
    return;
  }

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      console.error("redirectToCheckout: error fetching cart");
      return;
    }
    redirect(cart.checkoutUrl);
  } catch (error) {
    console.error("redirectToCheckout failed:", error);
  }
}

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart();
    const cookieStore = await cookies();
    cookieStore.set("cartId", cart.id!);
  } catch (error) {
    console.error("createCartAndSetCookie failed:", error);
  }
}