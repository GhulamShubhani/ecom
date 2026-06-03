'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { addItem } from '@/components/cart/actions';
import { CartAddAnimation } from '@/components/cart/CartAddAnimation';
import { useCart } from '@/components/cart/cart-context';
import LoadingDots from '@/components/loading-dots';

function formatCurrency(amount: string, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function SearchProductCard({ product }: { product: Product }) {
  const { openCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [showAnim, setShowAnim] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const price = product.priceRange.minVariantPrice;

  /* Use first available variant for direct add-to-cart */
  const variantId =
    product.variants.find((v) => v.availableForSale)?.id ??
    product.variants[0]?.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!variantId) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    startTransition(async () => {
      const err = await addItem(null, variantId);
      if (!err) {
        setShowAnim(true);
        openCart();
        timerRef.current = setTimeout(() => setShowAnim(false), 1800);
      }
    });
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(204,0,0,0.3)]">
        {/* Image */}
        <Link
          href={`/product/${product.handle}`}
          className="relative block aspect-square overflow-hidden bg-linear-to-br from-gray-800 to-gray-900"
        >
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-700">
              <ShoppingBag className="h-12 w-12" />
            </div>
          )}

          {/* Badge */}
          {!product.availableForSale ? (
            <span className="absolute left-3 top-3 rounded-full bg-neutral-700 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
              Sold Out
            </span>
          ) : (
            <span className="absolute left-3 top-3 rounded-full bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              NEW
            </span>
          )}

          <button
            aria-label="Add to wishlist"
            className="absolute right-3 top-3 cursor-pointer text-gray-600 transition hover:text-brand-red"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-5 w-5" />
          </button>
        </Link>

        <div className="p-4">
          {/* Title */}
          <Link href={`/product/${product.handle}`}>
            <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-white transition-colors hover:text-brand-red">
              {product.title}
            </h3>
          </Link>

          {/* Stars (decorative) */}
          <div className="mb-2 flex items-center gap-1 text-xs text-gray-600">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Price */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-brand-red">
              {formatCurrency(price.amount, price.currencyCode)}
            </span>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isPending || !product.availableForSale}
            className={cn(
              'flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium transition-all duration-300',
              !product.availableForSale
                ? 'cursor-not-allowed border-neutral-700 bg-neutral-900 text-neutral-500'
                : isPending
                  ? 'cursor-wait border-neutral-700 bg-neutral-900 text-neutral-400'
                  : 'border-brand-red/40 text-brand-red group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white'
            )}
          >
            {!product.availableForSale ? (
              'Out of Stock'
            ) : isPending ? (
              <LoadingDots className="bg-neutral-400" />
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </article>

      <CartAddAnimation visible={showAnim} />
    </>
  );
}
