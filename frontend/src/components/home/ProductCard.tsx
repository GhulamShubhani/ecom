'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

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

  const handleAddToCart = (e: React.MouseEvent) => {
    // Stop propagation so a parent card link (if any) doesn't also fire
    e.stopPropagation();
    // Navigate to PDP where user selects variants and adds to cart
    router.push(product.href);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-gray bg-brand-charcoal transition-all duration-300 hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(204,0,0,0.35)]">
      {/* Product image — clicking navigates to PDP */}
      <Link href={product.href} className="relative block aspect-square bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
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
          className="absolute right-3 top-3 text-gray-500 transition hover:text-brand-red"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="h-5 w-5" />
        </button>
      </Link>

      <div className="p-4">
        {/* Product name — clicking navigates to PDP */}
        <Link href={product.href}>
          <h3 className="mb-2 text-sm font-medium leading-snug text-white transition-colors hover:text-brand-red">
            {product.name}
          </h3>
        </Link>

        <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star key={`${product.id}-star-${idx}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          {product.reviewCount ? (
            <span className="ml-1">({product.reviewCount})</span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand-red">{formatCurrency(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
          ) : null}
        </div>

        {/* Add to Cart — does NOT wrap in a page-navigation Link */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            'mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-red/40 py-2 text-center text-sm text-brand-red transition-all duration-300',
            'group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red'
          )}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
