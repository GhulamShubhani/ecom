'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '@/types/product';
import { cn, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  /** Set to true when this card is in the first viewport — eager load. */
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const [showSizes, setShowSizes] = useState(false);

  return (
    <article className="group relative flex h-full w-full flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-cream-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, (max-width: 1280px) 18vw, 14vw"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />

        {product.tag && (
          <span className="absolute left-2 top-2 inline-flex items-center rounded-sm bg-ink px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest2 text-cream-50">
            {product.tag}
          </span>
        )}

        {/* Quick-add overlay */}
        <div
          className={cn(
            'pointer-events-none absolute inset-x-2 bottom-2 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100',
          )}
          onMouseLeave={() => setShowSizes(false)}
        >
          {product.isAccessory ? (
            <button
              type="button"
              className="w-full rounded-full bg-cream-50/95 px-3 py-2 text-[10px] font-medium uppercase tracking-wider2 text-ink shadow-sm backdrop-blur transition-colors hover:bg-ink hover:text-cream-50"
              onClick={(e) => e.preventDefault()}
            >
              Add to cart
            </button>
          ) : (
            <div className="flex w-full items-center justify-center gap-1 rounded-full bg-cream-50/95 px-2 py-1.5 backdrop-blur">
              {showSizes ? (
                product.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-medium tracking-wider2 text-ink transition-colors hover:bg-ink hover:text-cream-50"
                  >
                    {size}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSizes(true);
                  }}
                  className="text-[10px] font-medium uppercase tracking-wider2 text-ink"
                >
                  Select size
                </button>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Card meta */}
      <div className="mt-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/product/${product.slug}`}
            className="block truncate text-[12px] text-ink"
          >
            {product.name}
            {product.hasMoreColors && <span className="ml-1 text-ink-muted">+1</span>}
          </Link>
          <p className="mt-0.5 text-[11px] text-ink-soft">
            {formatPrice(product.price, product.currency ?? 'USD')}
          </p>
        </div>
        <button
          type="button"
          aria-label={`Quick add ${product.name}`}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-cream-50"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </article>
  );
}
