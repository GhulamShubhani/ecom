"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import type { Product } from "@/lib/shopify/types";

type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

const LOAD_THROTTLE_MS = 900;

export default function CollectionProductsGrid({
  collectionHandle,
  sort,
  initialProducts,
  initialPageInfo,
}: {
  collectionHandle: string;
  sort?: string;
  initialProducts: Product[];
  initialPageInfo: PageInfo;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestInFlightRef = useRef(false);
  const lastLoadAtRef = useRef(0);

  const loadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor || requestInFlightRef.current) return;

    const now = Date.now();

    if (now - lastLoadAtRef.current < LOAD_THROTTLE_MS) return;

    lastLoadAtRef.current = now;
    requestInFlightRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        first: "20",
        after: pageInfo.endCursor,
      });

      if (sort) params.set("sort", sort);

      const response = await fetch(
        `/api/collections/${collectionHandle}/products?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch more products.");
      }

      const data = (await response.json()) as {
        products: Product[];
        pageInfo: PageInfo;
      };

      setProducts((current) => {
        const seen = new Set(current.map((product) => product.handle));
        const nextProducts = data.products.filter((product) => !seen.has(product.handle));

        return [...current, ...nextProducts];
      });
      setPageInfo(data.pageInfo);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to fetch more products.");
    } finally {
      requestInFlightRef.current = false;
      setIsLoading(false);
    }
  }, [collectionHandle, pageInfo.endCursor, pageInfo.hasNextPage, sort]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !pageInfo.hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore, pageInfo.hasNextPage]);

  if (!products.length) {
    return (
      <div className="rounded-3xl border border-brand-clay/15 bg-white/70 p-12 text-center">
        <h2 className="font-cormorant text-4xl font-medium text-brand-burgundy">
          No products found
        </h2>
        <p className="mt-3 font-jakarta text-sm text-brand-burgundy/60">
          This collection is being curated. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductGridItems products={products} />
        {isLoading ? <ProductSkeletons /> : null}
      </Grid>
      {error ? (
        <p className="mt-8 text-center font-jakarta text-sm text-brand-burgundy/60">
          {error}
        </p>
      ) : null}
      <div ref={sentinelRef} className="h-12" aria-hidden="true" />
    </>
  );
}

function ProductSkeletons() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid.Item
          key={index}
          className="animate-pulse rounded-3xl border border-brand-clay/15 bg-brand-sand/70"
        />
      ))}
    </>
  );
}
