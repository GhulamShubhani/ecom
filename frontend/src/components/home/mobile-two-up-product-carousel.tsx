'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';

const GAP_PX = 20;

type Props = {
  products: HomeProduct[];
  className?: string;
};

export default function MobileTwoUpProductCarousel({ products, className }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 4);

    const maxScroll = scrollWidth - clientWidth;
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 1);
  }, []);

  useEffect(() => {
    updateState();
    const el = scrollerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateState, { passive: true });
    window.addEventListener('resize', updateState);

    return () => {
      el.removeEventListener('scroll', updateState);
      window.removeEventListener('resize', updateState);
    };
  }, [updateState, products.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * direction, behavior: 'smooth' });
  };

  if (!products.length) return null;

  const itemWidth = `calc((100% - ${GAP_PX}px) / 2)`;

  return (
    <div className={cn('md:hidden', className)}>
      <div className="relative px-6">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous products"
          disabled={!canScrollLeft}
          className="absolute top-[38%] left-1 z-10 -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/95 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next products"
          disabled={!canScrollRight}
          className="absolute top-[38%] right-1 z-10 -translate-y-1/2 rounded-full border border-brand-clay/25 bg-white/95 p-2 text-brand-burgundy shadow-sm backdrop-blur transition hover:border-brand-clay hover:text-brand-clay disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div
          ref={scrollerRef}
          className={cn(
            'no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth',
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          )}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none snap-start"
              style={{ width: itemWidth }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-6 mt-4 h-0.5 overflow-hidden rounded-full bg-brand-clay/20">
        <div
          className="h-full rounded-full bg-brand-burgundy transition-[width] duration-300 ease-out"
          style={{ width: `${Math.max(progress * 100, 8)}%` }}
        />
      </div>
    </div>
  );
}
