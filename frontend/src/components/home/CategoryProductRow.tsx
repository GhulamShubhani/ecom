import { getProducts } from '@/lib/shopify';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ProductCard from './ProductCard';

// ── same mapping helper your ProductGrid already uses ──────────────────────
function mapToHomeProduct(product: Awaited<ReturnType<typeof getProducts>>[number], index: number): HomeProduct {
  const price = Number(product.priceRange.minVariantPrice.amount || 0);
  const compareAtPrice = index % 2 === 0 ? Math.round(price * 1.25) : undefined;

  return {
    id: product.id,
    name: product.title,
    price,
    originalPrice: compareAtPrice,
    badge: 'BESTSELLER',
    rating: 5,
    reviewCount: 120 + index * 11,
    category: 'Popular',
    isBestseller: true,
    image:
      product.featuredImage?.url ||
      product.images?.[0]?.url ||
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80',
      href: `/product/${product.handle}`,
      variantId: product.variants?.[0]?.id,
  };
}

// ── data fetcher — same as ProductGrid but filtered by query ───────────────
async function getCategoryProducts(query: string): Promise<HomeProduct[]> {
  try {
    const storeProducts = await getProducts({ sortKey: 'BEST_SELLING', reverse: false, query });
    return storeProducts.slice(0, 4).map(mapToHomeProduct);
  } catch {
    return [];
  }
}

// ── component props ────────────────────────────────────────────────────────
type Props = {
  title: string;
  subtitle?: string;
  href: string;
  query: string;        
  accentColor?: string;  
};

export default async function CategoryProductRow({
  title,
  subtitle = 'Collection',
  href,
  query,
  accentColor = 'text-brand-red',
}: Props) {
  const products = await getCategoryProducts(query);
    
  if (!products.length) return null;

  return (
    <section className="py-14">
      {/* ── row header ───────────────────────────────────────────── */}
      <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between px-4 md:px-6">
        <div>
          <p className={cn('mb-1 text-xs font-semibold uppercase tracking-[0.25em]', accentColor)}>
            {subtitle}
          </p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {title}
          </h2>
        </div>

        <Link
          href={href}
          className={cn(
            'group flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80',
            accentColor,
          )}
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ── product row ──────────────────────────────────────────── */}
      <div className="relative">
        {/* right-edge fade — hints more cards on mobile */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16
                        bg-gradient-to-l from-brand-black to-transparent md:hidden" />

        <div
          className={cn(
            // mobile: horizontal snap scroll
            'flex gap-4 overflow-x-auto px-4 pb-2',
            'snap-x snap-mandatory scroll-smooth',
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
            // desktop: normal 4-col grid (same as ProductGrid)
            'md:grid md:grid-cols-4 md:overflow-visible md:px-6',
            'md:mx-auto md:max-w-7xl',
          )}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[200px] flex-shrink-0 snap-start md:w-auto md:flex-shrink md:snap-none"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}