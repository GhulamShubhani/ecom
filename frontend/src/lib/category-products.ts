import {
  AUDIENCE_COLLECTIONS,
  type AudienceCollectionConfig,
} from "@/constants/audience-collections";
import { IMAGES } from "@/constants/images";
import { getCollectionProductsPage, getProductsPage } from "@/lib/shopify";
import type { Product as ShopifyProduct } from "@/lib/shopify/types";
import { resolveCollection } from "@/lib/resolve-collection";
import type { Product as HomeProduct } from "@/lib/types";

export const CATEGORY_PAGE_SIZE = 20;
export const CATEGORY_LOAD_THROTTLE_MS = 900;

export type CategoryPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export function getAudienceCollectionBySlug(
  slug: string
): AudienceCollectionConfig | undefined {
  return Object.values(AUDIENCE_COLLECTIONS).find((item) => item.slug === slug);
}

export function getCategorySortConfig(sort?: string) {
  switch (sort) {
    case "price-low-high":
      return { sortKey: "PRICE", reverse: false };
    case "price-high-low":
      return { sortKey: "PRICE", reverse: true };
    case "newest":
      return { sortKey: "CREATED_AT", reverse: true };
    case "featured":
    default:
      return { sortKey: "BEST_SELLING", reverse: false };
  }
}

export function mapShopifyProductToHomeProduct(
  product: ShopifyProduct,
  index: number,
  categoryTitle: string
): HomeProduct {
  const price = Number(product.priceRange.minVariantPrice.amount || 0);

  return {
    id: product.id,
    name: product.title,
    price,
    originalPrice: index % 2 === 0 ? Math.round(price * 1.25) : undefined,
    badge: "BESTSELLER",
    rating: 5,
    reviewCount: 120 + index * 11,
    category: categoryTitle,
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

export async function fetchCategoryProductsPage({
  slug,
  sort,
  after,
  first = CATEGORY_PAGE_SIZE,
}: {
  slug: string;
  sort?: string;
  after?: string | null;
  first?: number;
}) {
  const config = getAudienceCollectionBySlug(slug);

  if (!config) {
    return null;
  }

  const { sortKey, reverse } = getCategorySortConfig(sort);
  const resolved = await resolveCollection(
    config.handleCandidates,
    config.titleCandidates
  );

  if (resolved) {
    const page = await getCollectionProductsPage({
      collection: resolved.handle,
      first,
      after,
      sortKey,
      reverse,
    });

    if (page.products.length > 0 || !config.tagFallback) {
      return {
        products: page.products,
        pageInfo: page.pageInfo,
        totalCount: page.collection?.productCount ?? page.products.length,
        categoryTitle: page.collection?.title ?? config.eyebrow,
      };
    }
  }

  if (config.tagFallback) {
    const page = await getProductsPage({
      query: config.tagFallback,
      first,
      after,
      sortKey,
      reverse,
    });

    return {
      products: page.products,
      pageInfo: page.pageInfo,
      totalCount: null as number | null,
      categoryTitle: config.eyebrow,
    };
  }

  return {
    products: [],
    pageInfo: { hasNextPage: false, endCursor: null },
    totalCount: 0,
    categoryTitle: config.eyebrow,
  };
}
