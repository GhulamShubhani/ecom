import { MOST_LOVED_ESSENTIALS } from '@/constants/audience-collections';
import { IMAGES } from '@/constants/images';
import { resolveCollection } from '@/lib/resolve-collection';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import Prose from '@/components/prose';
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

export default async function ProductGrid() {
  const resolved = await resolveCollection(
    MOST_LOVED_ESSENTIALS.handleCandidates,
    MOST_LOVED_ESSENTIALS.titleCandidates
  );

  const storeProducts = resolved
    ? await getCollectionProducts({
        collection: resolved.handle,
        sortKey: 'BEST_SELLING',
        reverse: false,
      })
    : await getProducts({
        sortKey: 'BEST_SELLING',
        reverse: false,
      });

  const products = storeProducts.slice(0, 8).map(mapToHomeProduct);
  const descriptionHtml = resolved?.collection.descriptionHtml?.trim();

  return (
    <section className={cn('bg-brand-oatmilk py-24')}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          {descriptionHtml ? (
            <Prose
              html={descriptionHtml}
              className="prose-headings:text-brand-burgundy prose-p:font-jakarta prose-p:text-sm prose-p:leading-relaxed prose-p:text-brand-burgundy/60"
            />
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

