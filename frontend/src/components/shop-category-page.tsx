import Image from "next/image";



import type { AudienceCollectionConfig } from "@/constants/audience-collections";

import {

  CATEGORY_PAGE_SIZE,

  fetchCategoryProductsPage,

  mapShopifyProductToHomeProduct,

} from "@/lib/category-products";

import { resolveCollection } from "@/lib/resolve-collection";

import Prose from "@/components/prose";

import ShopCategoryProductsSection from "./shop-category-products-section";



type CategoryConfig = Pick<

  AudienceCollectionConfig,

  | "slug"

  | "handleCandidates"

  | "titleCandidates"

  | "eyebrow"

  | "accentClass"

  | "gradientClass"

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

      mapShopifyProductToHomeProduct(

        product,

        index,

        page.categoryTitle

      )

    ) ?? [];



  const heroDescriptionHtml = resolved?.collection.descriptionHtml?.trim();



  return (

    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">

      <section className="relative overflow-hidden border-b border-brand-clay/15 bg-brand-sand/70">

        <div className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-brand-clay/20 blur-[100px]" />

        <div className="mx-auto grid min-h-[360px] max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24">

          <div>

            <p

              className={`mb-4 font-jakarta text-[11px] font-semibold uppercase tracking-[0.4em] ${config.accentClass}`}

            >

              {config.eyebrow}

            </p>



            {heroDescriptionHtml ? (
              <Prose
                html={heroDescriptionHtml}
                className="max-w-xl prose-headings:font-cormorant prose-headings:text-brand-burgundy prose-p:font-jakarta prose-p:text-base prose-p:leading-7 prose-p:text-brand-burgundy/65 md:prose-p:text-lg"
              />
            ) : null}



            <a href="#products" className="btn-brand mt-8">

              Shop All

            </a>

          </div>



          <div className="relative mx-auto aspect-[4/5] w-full max-w-md md:mx-0 md:ml-auto">

            <div className="absolute -inset-4 rounded-4xl bg-brand-champagne/15 blur-3xl" />

            <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl border border-brand-clay/20 shadow-[0_40px_90px_-50px_rgba(74,21,37,0.45)]">

              <Image

                src={config.heroImage}

                alt={`${config.eyebrow} editorial`}

                fill

                priority

                sizes="(max-width: 768px) 100vw, 420px"

                className="object-cover"

              />

              <div

                className={`absolute inset-0 bg-linear-to-t ${config.gradientClass} via-transparent to-brand-night/10`}

              />

            </div>

          </div>

        </div>

      </section>



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


