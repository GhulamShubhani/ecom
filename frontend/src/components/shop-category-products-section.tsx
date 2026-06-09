"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product as HomeProduct } from "@/lib/types";

const LOAD_THROTTLE_MS = 900;

type CategoryPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};
import CategorySortBar from "./category-sort-bar";
import ProductCard from "./home/ProductCard";

type Props = {
  slug: string;
  currentSort: string;
  totalCount: number | null;
  initialProducts: HomeProduct[];
  initialPageInfo: CategoryPageInfo;
};

export default function ShopCategoryProductsSection({
  slug,
  currentSort,
  totalCount,
  initialProducts,
  initialPageInfo,
}: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestInFlightRef = useRef(false);
  const lastLoadAtRef = useRef(0);

  useEffect(() => {
    setProducts(initialProducts);
    setPageInfo(initialPageInfo);
    setError(null);
  }, [initialProducts, initialPageInfo, currentSort]);

  const loadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor || requestInFlightRef.current) {
      return;
    }

    const now = Date.now();
    if (now - lastLoadAtRef.current < LOAD_THROTTLE_MS) {
      return;
    }

    lastLoadAtRef.current = now;
    requestInFlightRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        first: "20",
        after: pageInfo.endCursor,
        sort: currentSort,
      });

      const response = await fetch(`/api/category/${slug}/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Unable to fetch more products.");
      }

      const data = (await response.json()) as {
        products: HomeProduct[];
        pageInfo: CategoryPageInfo;
      };

      setProducts((current) => {
        const seen = new Set(current.map((product) => product.id));
        const nextProducts = data.products.filter((product) => !seen.has(product.id));
        return [...current, ...nextProducts];
      });
      setPageInfo(data.pageInfo);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to fetch more products."
      );
    } finally {
      requestInFlightRef.current = false;
      setIsLoading(false);
    }
  }, [currentSort, pageInfo.endCursor, pageInfo.hasNextPage, slug]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !pageInfo.hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, pageInfo.hasNextPage]);

  return (
    <>
      <CategorySortBar
        count={totalCount ?? products.length}
        loadedCount={products.length}
        currentSort={currentSort}
      />

      <section id="products" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="aspect-[4/5] animate-pulse rounded-3xl border border-brand-clay/15 bg-brand-sand/70"
                    />
                  ))
                : null}
            </div>

            {error ? (
              <p className="mt-8 text-center font-jakarta text-sm text-brand-burgundy/60">
                {error}
              </p>
            ) : null}

            {isLoading && !error ? (
              <p className="mt-8 text-center font-jakarta text-sm text-brand-burgundy/50">
                Loading more products…
              </p>
            ) : null}

            <div ref={sentinelRef} className="h-12" aria-hidden="true" />
          </>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-brand-clay/15 bg-white/70 px-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sand">
              <ShoppingBag className="h-8 w-8 text-brand-clay" />
            </div>

            <h2 className="font-cormorant text-3xl font-medium text-brand-burgundy">
              No products found
            </h2>

            <p className="mt-3 max-w-md font-jakarta text-sm leading-6 text-brand-burgundy/60">
              We could not find any products in this collection right now.
            </p>

            <Link href="/search" className="btn-brand-ghost mt-6">
              Back to Search
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
