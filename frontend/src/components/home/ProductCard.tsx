'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { addItem } from '@/components/cart/actions';
import { CartAddAnimation } from '@/components/cart/CartAddAnimation';
import { useCart } from '@/components/cart/cart-context';
import LoadingDots from '@/components/loading-dots';

type Props = {
  product: Product;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const { openCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [showAnim, setShowAnim] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!product.variantId) {
      // Multi-variant product — go to PDP to select options
      router.push(product.href);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    startTransition(async () => {
      const err = await addItem(null, product.variantId);
      if (!err) {
        setShowAnim(true);
        openCart();
        timerRef.current = setTimeout(() => setShowAnim(false), 1800);
      }
    });
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-brand-gray bg-brand-charcoal transition-all duration-300 hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(204,0,0,0.35)]">
        {/* Product image — clicking navigates to PDP */}
        <Link
          href={product.href}
          className="relative block aspect-square overflow-hidden bg-linear-to-br from-gray-800 to-gray-900"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width:768px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-brand-red px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
              {product.badge}
            </span>
          ) : null}
          <button
            aria-label="Add to wishlist"
            className="absolute right-3 top-3 cursor-pointer text-gray-500 transition hover:text-brand-red"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="h-5 w-5" />
          </button>
        </Link>

        <div className="p-4">
          {/* Name */}
          <Link href={product.href}>
            <h3 className="mb-2 text-sm font-medium leading-snug text-white transition-colors hover:text-brand-red">
              {product.name}
            </h3>
          </Link>

          {/* Stars */}
          <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={`${product.id}-star-${idx}`}
                className="h-3 w-3 fill-yellow-400 text-yellow-400"
              />
            ))}
            {product.reviewCount ? (
              <span className="ml-1">({product.reviewCount})</span>
            ) : null}
          </div>

          {/* Price */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-brand-red">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            ) : null}
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isPending}
            className={cn(
              'flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium transition-all duration-300',
              isPending
                ? 'cursor-wait border-neutral-700 bg-neutral-900 text-neutral-400'
                : 'border-brand-red/40 text-brand-red group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white'
            )}
          >
            {isPending ? (
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

      {/* Centered full-screen cart animation */}
      <CartAddAnimation visible={showAnim} />
    </>
  );
}
