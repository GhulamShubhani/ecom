import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { getCollectionProducts, getCollections } from "@/lib/shopify";
import type { Product as HomeProduct } from "@/lib/types";
import CategorySortBar from "./category-sort-bar";
import ProductCard from "./home/ProductCard";

type CategoryConfig = {
  slug: string;
  collectionHandle?: string;
  eyebrow: string;
  title: string;
  fallbackDescription: string;
  accentClass: string;
  gradientClass: string;
};

type SearchParams = {
  sort?: string;
  limit?: string;
  cursor?: string;
};

type StoreProduct = Awaited<ReturnType<typeof getCollectionProducts>>[number];

const DEFAULT_PRODUCT_LIMIT = 12;

const fallbackImage =
  "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80";

const getSortConfig = (sort?: string) => {
  switch (sort) {
    case "price-low-high":
      return {
        sortKey: "PRICE",
        reverse: false,
      };

    case "price-high-low":
      return {
        sortKey: "PRICE",
        reverse: true,
      };

    case "newest":
      return {
        sortKey: "CREATED_AT",
        reverse: true,
      };

    case "featured":
    default:
      return {
        sortKey: "BEST_SELLING",
        reverse: false,
      };
  }
};

const getVisibleLimit = (limit?: string) => {
  const parsedLimit = Number(limit);

  if (!Number.isFinite(parsedLimit) || parsedLimit < DEFAULT_PRODUCT_LIMIT) {
    return DEFAULT_PRODUCT_LIMIT;
  }

  return parsedLimit;
};

const mapShopifyProductToHomeProduct = (
  product: StoreProduct,
  index: number,
  categoryTitle: string
): HomeProduct => {
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
      fallbackImage,
    href: `/product/${product.handle}`,
  };
};

export default async function ShopCategoryPage({
  config,
  searchParams,
}: {
  config: CategoryConfig;
  searchParams?: SearchParams;
}) {
  const currentSort = searchParams?.sort || "featured";
  const visibleLimit = getVisibleLimit(searchParams?.limit);

  const { sortKey, reverse } = getSortConfig(currentSort);

  const collectionHandle = config.collectionHandle || config.slug;

const collections = await getCollections();
const collection = collections.find((item) => item.handle === collectionHandle);

const storeProducts = await getCollectionProducts({
  collection: collectionHandle,
  sortKey,
  reverse,
});
  const products = storeProducts.map((product, index) =>
    mapShopifyProductToHomeProduct(
      product,
      index,
      collection?.title || config.eyebrow
    )
  );

  const hasProducts = products.length > 0;
  const visibleProducts = products.slice(0, visibleLimit);
  const showLoadMore = products.length > visibleProducts.length;

  const nextLimit = Math.min(
    visibleLimit + DEFAULT_PRODUCT_LIMIT,
    products.length
  );

  const loadMoreParams = new URLSearchParams({
    sort: currentSort,
    limit: String(nextLimit),
  });

  const heroDescription =
    collection?.description?.trim() || config.fallbackDescription;

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <section
        className={`relative overflow-hidden bg-gradient-to-r ${config.gradientClass} via-brand-black to-brand-black`}
      >
        <div className="mx-auto grid min-h-[300px] max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
          <div>
            <p
              className={`mb-3 text-sm font-semibold uppercase tracking-[0.3em] ${config.accentClass}`}
            >
              {config.eyebrow}
            </p>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              {config.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-300 md:text-lg">
              {heroDescription}
            </p>

            <a
              href="#products"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-black transition hover:scale-105 hover:bg-neutral-200"
            >
              Shop All
            </a>
          </div>

          <div className="hidden justify-end md:flex">
            <div className="relative h-56 w-56 rounded-full bg-white/10 blur-sm">
              <div
                className={`absolute inset-8 rounded-full bg-gradient-to-br ${config.gradientClass} to-transparent opacity-80 blur-2xl`}
              />

              <div className="absolute -right-8 top-8 h-32 w-32 rounded-full border border-white/20" />

              <div className="absolute bottom-6 left-0 h-20 w-20 rounded-full border border-white/10 bg-white/5" />
            </div>
          </div>
        </div>
      </section>

      <CategorySortBar count={products.length} currentSort={currentSort} />

      <section id="products" className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {hasProducts ? (
          <>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {showLoadMore && (
              <div className="mt-10 flex justify-center">
                <Link
                  href={`/${config.slug}?${loadMoreParams.toString()}#products`}
                  className="rounded-full border border-brand-red px-8 py-3 text-sm font-semibold text-brand-red transition hover:bg-brand-red hover:text-white"
                >
                  Load More
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-brand-charcoal px-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-black">
              <ShoppingBag className="h-8 w-8 text-neutral-400" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              No products found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">
              We could not find any products in this collection right now.
            </p>

            <Link
              href="/search"
              className="mt-6 rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Back to Search
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}