'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCarouselProps {
  products: Product[];
  ariaLabel?: string;
  /** Eager-load images for the first carousel above the fold. */
  priority?: boolean;
}

export function ProductCarousel({
  products,
  ariaLabel = 'Product carousel',
  priority,
}: ProductCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [products.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.clientWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -step * 2 : step * 2, behavior: 'smooth' });
  };

  return (
    <div className="relative" role="region" aria-label={ariaLabel}>
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth lg:gap-5"
      >
        {products.map((product, idx) => (
          <div
            key={product.id}
            className={cn(
              'shrink-0 snap-start',
              // Card widths — designed so 6–7 cards are visible on wide screens
              // 'w-[60%] sm:w-[34%] md:w-[26%] lg:w-[18%] xl:w-[15.2%] 2xl:w-[14.2857%]',
              // 4–5 cards visible on wide screens
              'w-[75%] sm:w-[45%] md:w-[32%] lg:w-[24%] xl:w-[21%] 2xl:w-[20%]',
            )}
          >
            <ProductCard product={product} priority={priority && idx < 4} />
          </div>
        ))}
      </div>

      {/* Arrows — desktop only */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={cn(
          'absolute left-2 top-[45%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-white shadow-md backdrop-blur transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:scale-105 lg:inline-flex',
          !canScrollLeft && 'pointer-events-none opacity-0',
        )}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={cn(
          'absolute right-2 top-[45%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-white shadow-md backdrop-blur transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:scale-105 lg:inline-flex',
          !canScrollRight && 'pointer-events-none opacity-0',
        )}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
