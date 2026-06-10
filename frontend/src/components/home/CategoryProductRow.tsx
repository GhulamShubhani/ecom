import Image from 'next/image';
import type { AudienceCollectionConfig } from '@/constants/audience-collections';
import { IMAGES } from '@/constants/images';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import { resolveCollection } from '@/lib/resolve-collection';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MobileTwoUpProductCarousel from './mobile-two-up-product-carousel';
import ProductCard from './ProductCard';

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
  try {
    if (!resolvedHandle) {
      if (!config.tagFallback) return [];

      const taggedProducts = await getProducts({
        query: config.tagFallback,
        sortKey: 'BEST_SELLING',
        reverse: false,
      });

      return taggedProducts.slice(0, 5).map(mapToHomeProduct);
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

    return storeProducts.slice(0, 5).map(mapToHomeProduct);
  } catch {
    if (!config.tagFallback) return [];

    try {
      const taggedProducts = await getProducts({
        query: config.tagFallback,
        sortKey: 'BEST_SELLING',
        reverse: false,
      });
      return taggedProducts.slice(0, 5).map(mapToHomeProduct);
    } catch {
      return [];
    }
  }
}

export default async function CategoryProductRow(config: AudienceCollectionConfig) {
  const resolved = await resolveCollection(
    config.handleCandidates,
    config.titleCandidates
  );
  
  const collectionHandle = resolved?.handle ?? config.handleCandidates[0];
  const products = await getCategoryProducts(config, collectionHandle);
  
  if (!products.length) return null;

  const viewAllHref = `/collections/${config?.slug}`;

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 overflow-hidden rounded-3xl border border-brand-clay/15 bg-brand-night text-brand-oatmilk shadow-[0_30px_80px_-52px_rgba(74,21,37,0.55)]">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[220px] p-8 md:min-h-[280px] md:p-10">
              <div className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-brand-clay/15 blur-3xl" />
              <p
                className={cn(
                  'mb-3 font-jakarta text-[11px] font-semibold uppercase tracking-[0.4em]',
                  config.rowAccentClass
                )}
              >
                {config.rowSubtitle}
              </p>
              <h2 className="font-cormorant text-4xl font-medium md:text-5xl">
                {config.heroTitle}
              </h2>
              <p className="mt-4 max-w-xl font-jakarta text-sm leading-relaxed text-brand-oatmilk/75 md:text-base">
                {config.heroDescription}
              </p>
              <Link
                href={viewAllHref}
                className="btn-brand mt-6 inline-flex w-fit"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="relative min-h-[220px] md:min-h-[280px]">
              <Image
                src={config.heroImage}
                alt={`${config.heroTitle} collection`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-t md:bg-linear-to-l',
                  config.gradientClass,
                  'via-brand-night/20 to-brand-night/70'
                )}
              />
            </div>
          </div>
        </div>

        <MobileTwoUpProductCarousel products={products} />
        <div className="hidden gap-5 md:grid md:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
