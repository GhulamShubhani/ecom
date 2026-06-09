import type { AudienceCollectionConfig } from '@/constants/audience-collections';
import { IMAGES } from '@/constants/images';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import { resolveCollection } from '@/lib/resolve-collection';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Prose from '@/components/prose';
import MobileTwoUpProductCarousel from './mobile-two-up-product-carousel';
import ProductCard from './ProductCard';

// ── same mapping helper your ProductGrid already uses ──────────────────────
type StoreProduct = Awaited<ReturnType<typeof getCollectionProducts>>[number];

function mapToHomeProduct(product: StoreProduct, index: number): HomeProduct {
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
      IMAGES.products.fallback,
    href: `/product/${product.handle}`,
    handle: product.handle,
    variantId: product.variants?.[0]?.id,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    availableForSale: product.availableForSale,
  };
}

async function getCategoryProducts(
  config: AudienceCollectionConfig,
  resolvedHandle?: string
): Promise<HomeProduct[]> {
  if (!resolvedHandle) {
    if (!config.tagFallback) return [];

    const taggedProducts = await getProducts({
      query: config.tagFallback,
      sortKey: 'BEST_SELLING',
      reverse: false,
    });

    return taggedProducts.slice(0, 4).map(mapToHomeProduct);
  }

  let storeProducts = await getCollectionProducts({
    collection: resolvedHandle,
    sortKey: 'BEST_SELLING',
    reverse: false,
  });

  if (!storeProducts.length && config.tagFallback) {
    storeProducts = await getProducts({
      query: config.tagFallback,
      sortKey: 'BEST_SELLING',
      reverse: false,
    });
  }

  return storeProducts.slice(0, 4).map(mapToHomeProduct);
}

export default async function CategoryProductRow(config: AudienceCollectionConfig) {
  const { slug } = config;

  const resolved = await resolveCollection(
    config.handleCandidates,
    config.titleCandidates
  );
  const descriptionHtml = resolved?.collection.descriptionHtml?.trim();
  const products = await getCategoryProducts(config, resolved?.handle);

  if (!products.length) return null;

  return (
    <section className="py-20">
      {/* ── row header ───────────────────────────────────────────── */}
      <div className="mx-auto mb-9 flex max-w-7xl items-end justify-between gap-6 px-6">
        <div className="max-w-2xl">
          {descriptionHtml ? (
            <Prose
              html={descriptionHtml}
              className="prose-p:font-jakarta prose-p:text-brand-burgundy/60 prose-headings:text-brand-burgundy"
            />
          ) : null}
        </div>

        <Link
          href={`/${slug}`}
          className={cn(
            'group hidden items-center gap-2 rounded-full border border-brand-clay/30 px-5 py-2.5 font-jakarta text-xs font-semibold uppercase tracking-wider2 text-brand-burgundy transition-all hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-oatmilk sm:flex',
          )}
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ── products: mobile carousel / desktop grid ───────────────── */}
      <div className="mx-auto max-w-7xl">
        <MobileTwoUpProductCarousel products={products} />
        <div className="hidden gap-5 px-6 md:grid md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}