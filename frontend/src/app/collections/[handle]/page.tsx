import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/constants/brand";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionProductsGrid from "@/components/collections/collection-products-grid";
import { formatProductCount, getCollectionImage } from "@/components/collections/collection-card";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollection, getCollectionProductsPage } from "@/lib/shopify";
import { cn, createUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<{ sort?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) return notFound();

  return {
    title: `${collection.seo.title || collection.title} | ${BRAND.name}`,
    description:
      collection.seo.description ||
      collection.description ||
      `Explore this curated ${BRAND.name} collection.`,
    openGraph: collection.image?.url
      ? {
          images: [
            {
              url: collection.image.url,
              width: collection.image.width,
              height: collection.image.height,
              alt: collection.image.altText || collection.title,
            },
          ],
        }
      : null,
  };
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { handle } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const sort = resolvedSearchParams.sort;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const page = await getCollectionProductsPage({
    collection: handle,
    first: 20,
    sortKey,
    reverse,
  });

  if (!page.collection) return notFound();

  const collection = {
    ...page.collection,
    path: `/collections/${page.collection.handle}`,
    products: { filters: [] },
  };
  const heroImage = getCollectionImage(collection);

  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <section className="relative overflow-hidden border-b border-brand-clay/15 bg-brand-night text-brand-oatmilk">
        {heroImage.src ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-brand-night via-brand-night/60 to-brand-night/20" />
        <div className="relative mx-auto max-w-screen-2xl px-6 py-20 md:py-28">
          <nav className="mb-10 flex flex-wrap items-center gap-3 font-jakarta text-xs font-semibold tracking-[0.22em] text-brand-oatmilk/70 uppercase">
            <Link href="/" className="transition-colors hover:text-brand-clay">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="transition-colors hover:text-brand-clay">
              Collections
            </Link>
            <span>/</span>
            <span className="text-brand-clay">{page.collection.title}</span>
          </nav>
          <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            Curated Collection
          </p>
          <h1 className="max-w-4xl font-cormorant text-6xl leading-tight font-medium md:text-8xl">
            {page.collection.title}
          </h1>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.34em] text-brand-champagne uppercase">
            {formatProductCount(page.collection.productCount)}
          </p>
          {page.collection.description ? (
            <p className="mt-6 max-w-2xl font-jakarta text-sm leading-relaxed text-brand-oatmilk/75 md:text-base">
              {page.collection.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-brand-clay/15 bg-white/60 p-5 md:flex-row md:items-center md:justify-between">
          <p className="font-jakarta text-sm text-brand-burgundy/65">
            Showing {page.products.length.toLocaleString()} of{" "}
            {formatProductCount(page.collection.productCount).toLowerCase()}
          </p>
          <div className="flex flex-wrap gap-2">
            {sorting.map((item) => {
              const active = (sort ?? null) === item.slug;
              const params = new URLSearchParams();

              if (item.slug) params.set("sort", item.slug);

              return (
                <Link
                  key={item.title}
                  href={createUrl(`/collections/${handle}`, params)}
                  className={cn(
                    "rounded-full px-4 py-2 font-jakarta text-xs font-semibold text-brand-burgundy/65 transition-colors hover:bg-brand-sand hover:text-brand-burgundy",
                    active && "bg-brand-burgundy text-brand-oatmilk hover:bg-brand-burgundy hover:text-brand-oatmilk"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

        <CollectionProductsGrid
          collectionHandle={handle}
          sort={sort}
          initialProducts={page.products}
          initialPageInfo={page.pageInfo}
        />
      </section>
    </main>
  );
}
