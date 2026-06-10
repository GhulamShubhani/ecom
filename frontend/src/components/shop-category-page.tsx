import type { AudienceCollectionConfig } from "@/constants/audience-collections";
import CategoryHero from "@/components/collections/category-hero";
import {
  CATEGORY_PAGE_SIZE,
  fetchCategoryProductsPage,
  mapShopifyProductToHomeProduct,
} from "@/lib/category-products";
import { resolveCollection } from "@/lib/resolve-collection";
import ShopCategoryProductsSection from "./shop-category-products-section";

type CategoryConfig = Pick<
  AudienceCollectionConfig,
  | "slug"
  | "handleCandidates"
  | "titleCandidates"
  | "eyebrow"
  | "heroTitle"
  | "heroDescription"
  | "accentClass"
  | "heroImage"
  | "tagFallback"
>;

type SearchParams = {
  sort?: string;
};

export default async function ShopCategoryPage({
  config,
  searchParams,
}: {
  config: CategoryConfig;
  searchParams?: SearchParams;
}) {
  const currentSort = searchParams?.sort || "featured";

  const resolved = await resolveCollection(
    config.handleCandidates,
    config.titleCandidates
  );

  const page = await fetchCategoryProductsPage({
    slug: config.slug,
    sort: currentSort,
    first: CATEGORY_PAGE_SIZE,
  });

  const initialProducts =
    page?.products.map((product, index) =>
      mapShopifyProductToHomeProduct(product, index, page.categoryTitle)
    ) ?? [];

  const heroDescriptionHtml = resolved?.collection.descriptionHtml?.trim();
  const productCount =
    page?.totalCount != null
      ? `${page.totalCount.toLocaleString()} ${page.totalCount === 1 ? "Product" : "Products"}`
      : undefined;

  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <CategoryHero
        eyebrow={config.eyebrow}
        title={config.heroTitle}
        description={config.heroDescription}
        descriptionHtml={heroDescriptionHtml}
        imageSrc={config.heroImage}
        imageAlt={`${config.heroTitle} collection at Apni Dukan`}
        accentClass={config.accentClass}
        productCount={productCount}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/search" },
          { label: config.heroTitle },
        ]}
      />

      <ShopCategoryProductsSection
        key={`${config.slug}-${currentSort}`}
        slug={config.slug}
        currentSort={currentSort}
        totalCount={page?.totalCount ?? null}
        initialProducts={initialProducts}
        initialPageInfo={page?.pageInfo ?? { hasNextPage: false, endCursor: null }}
      />
    </main>
  );
}
