'use client';

import { useState } from 'react';
import type { Product } from '@/lib/shopify/types';
import { SearchProductCard } from './SearchProductCard';
import { ChevronDown } from 'lucide-react';

const PAGE_SIZE = 20;

export function ProductGridPaginated({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = products.slice(0, visible);
  const remaining = products.length - visible;
  const hasMore = remaining > 0;

  return (
    <div>
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((product) => (
          <SearchProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show More */}
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-sm text-neutral-500">
            Showing <span className="text-white">{shown.length}</span> of{' '}
            <span className="text-white">{products.length}</span> styles
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-brand-red/50 px-8 py-3 text-sm font-semibold text-brand-red transition-all duration-300 hover:bg-brand-red hover:text-white hover:border-brand-red"
          >
            <span>Show {Math.min(remaining, PAGE_SIZE)} More</span>
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

      {/* End of results */}
      {!hasMore && products.length > PAGE_SIZE && (
        <p className="mt-8 text-center text-sm text-neutral-600">
          You&apos;ve seen all {products.length} styles
        </p>
      )}
    </div>
  );
}
