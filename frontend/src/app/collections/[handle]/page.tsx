import Link from "next/link";
import { BRAND } from "@/constants/brand";
import { getAudienceConfigByHandle } from "@/constants/audience-collections";
import { IMAGES } from "@/constants/images";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryHero from "@/components/collections/category-hero";
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
  const audienceConfig = getAudienceConfigByHandle(handle);
  const shopifyHero = getCollectionImage(collection);
  const heroImageSrc =
    shopifyHero.src ?? audienceConfig?.heroImage ?? IMAGES.banners.overlay;
  const heroTitle = audienceConfig?.heroTitle ?? page.collection.title;
  const heroEyebrow = audienceConfig?.eyebrow ?? "Curated Collection";
  const heroAccent = audienceConfig?.accentClass ?? "text-brand-champagne";
  const heroDescription =
    page.collection.description?.trim() || audienceConfig?.heroDescription;

  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <CategoryHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
        descriptionHtml={page.collection.descriptionHtml?.trim()}
        imageSrc={heroImageSrc}
        imageAlt={shopifyHero.alt || `${heroTitle} collection`}
        accentClass={heroAccent}
        productCount={formatProductCount(page.collection.productCount)}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: heroTitle },
        ]}
        ctaHref="#products"
        ctaLabel="Shop Collection"
      />

      <section id="products" className="mx-auto max-w-screen-2xl px-6 py-12 md:py-16">
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
