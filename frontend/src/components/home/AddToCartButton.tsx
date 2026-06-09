'use client';

import { useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, ShoppingBag } from 'lucide-react';
import type { Product as HomeProduct } from '@/lib/types';
import type { Product as ShopifyProduct, ProductVariant } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { addItem } from '@/components/cart/actions';
import { DEFAULT_OPTION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { flyToCart } from '@/lib/fly-to-cart';

type Props = {
  product: HomeProduct;
  className?: string;
};

export default function AddToCartButton({ product, className }: Props) {
  const router = useRouter();
  const { addCartItem, triggerAddedAnimation, showCartToast } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  async function handleAdd(event: React.MouseEvent<HTMLButtonElement>) {
    // Never let the click bubble up to the card's navigation link.
    event.preventDefault();
    event.stopPropagation();

    if (isAdding) return; // prevent duplicate rapid clicks

    // Without a variant we cannot add to cart — send the user to the details page.
    if (!product.variantId) {
      router.push(product.href);
      return;
    }

    // Kick off the "fly to cart" effect immediately for snappy feedback.
    const card = event.currentTarget.closest('article');
    const sourceImage = card?.querySelector('img') as HTMLElement | null;
    flyToCart(sourceImage ?? event.currentTarget, product.image);
    triggerAddedAnimation();
    showCartToast("added");

    setIsAdding(true);

    // Build the minimal shapes the cart context needs for the optimistic line.
    const variant: ProductVariant = {
      id: product.variantId,
      title: DEFAULT_OPTION,
      availableForSale: product.availableForSale ?? true,
      selectedOptions: [],
      price: {
        amount: String(product.price),
        currencyCode: product.currencyCode ?? 'USD',
      },
    };

    const optimisticProduct = {
      id: product.id,
      handle: product.handle ?? '',
      title: product.name,
      featuredImage: { url: product.image, altText: product.name },
    } as unknown as ShopifyProduct;

    try {
      // Optimistic update → cart count changes instantly (drives the animations).
      startTransition(() => addCartItem(variant, optimisticProduct));

      const error = await addItem(null, product.variantId);
      if (error) {
        console.error('Add to cart failed:', error);
      }

      router.refresh();
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding}
      aria-label={`Add ${product.name} to cart`}
      aria-busy={isAdding}
      className={cn(
        'mt-5 flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 font-jakarta text-xs font-semibold uppercase tracking-wider2 transition-all duration-300 ease-soft',
        justAdded
          ? 'border-brand-burgundy bg-brand-burgundy text-brand-oatmilk'
          : 'border-brand-burgundy/35 text-brand-burgundy hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-oatmilk',
        'disabled:cursor-not-allowed disabled:opacity-70',
        className
      )}
    >
      {isAdding ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : justAdded ? (
        <>
          <Check className="h-4 w-4 animate-cart-bounce" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </>
      )}
    </button>
  );
}
