"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CollectionCard from "@/components/collections/collection-card";
import type { Collection } from "@/lib/shopify/types";

type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

const LOAD_THROTTLE_MS = 900;

export default function CollectionsInfiniteGrid({
  initialCollections,
  initialPageInfo,
}: {
  initialCollections: Collection[];
  initialPageInfo: PageInfo;
}) {
  const [collections, setCollections] = useState(initialCollections);
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
      const response = await fetch(`/api/collections?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Unable to fetch more collections.");
      }

      const data = (await response.json()) as {
        collections: Collection[];
        pageInfo: PageInfo;
      };

      setCollections((current) => {
        const seen = new Set(current.map((collection) => collection.handle));
        const nextCollections = data.collections.filter((collection) => !seen.has(collection.handle));

        return [...current, ...nextCollections];
      });
      setPageInfo(data.pageInfo);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to fetch more collections.");
    } finally {
      requestInFlightRef.current = false;
      setIsLoading(false);
    }
  }, [pageInfo.endCursor, pageInfo.hasNextPage]);

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

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.handle}
            collection={collection}
            index={index}
            featured={index === 0}
          />
        ))}
        {isLoading ? <CollectionSkeletons /> : null}
      </div>
      {error ? (
        <p className="mt-8 text-center font-jakarta text-sm text-brand-burgundy/60">
          {error}
        </p>
      ) : null}
      <div ref={sentinelRef} className="h-12" aria-hidden="true" />
    </>
  );
}

function CollectionSkeletons() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="min-h-88 animate-pulse rounded-3xl border border-brand-clay/15 bg-white/50"
        >
          <div className="h-full min-h-88 rounded-3xl bg-brand-sand/70" />
        </div>
      ))}
    </>
  );
}
