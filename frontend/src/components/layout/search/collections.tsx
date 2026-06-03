import { getCollections } from "@/lib/shopify";
import FilterList from "./filter";
import { Suspense } from "react";
import clsx from "clsx";

const STATIC_COLLECTIONS = [
  { title: 'All',          path: '/search' },
  { title: 'Dresses',      path: '/search?q=dresses' },
  { title: 'Clothing',     path: '/search?q=clothing' },
  { title: 'Belts',        path: '/search?q=belts' },
  { title: 'Bags',         path: '/search?q=bags' },
  { title: 'New Arrivals', path: '/search?sort=latest-desc' },
  { title: 'Sale',         path: '/search?q=sale' },
];

async function CollectionList() {
  let collections: { title: string; path: string }[] = STATIC_COLLECTIONS;

  try {
    const shopifyCollections = await getCollections();
    if (shopifyCollections.length > 1) {
      collections = shopifyCollections.map((c) => ({ title: c.title, path: c.path }));
    }
  } catch {
    // Shopify unavailable — use static fashion categories
  }

  return <FilterList list={collections} title="Collections" />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}