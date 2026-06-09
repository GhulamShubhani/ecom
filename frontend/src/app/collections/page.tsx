import Image from "next/image";
import { BRAND } from "@/constants/brand";
import { IMAGES } from "@/constants/images";
import type { Metadata } from "next";
import CollectionsInfiniteGrid from "@/components/collections/collections-infinite-grid";
import { getCollectionsPage } from "@/lib/shopify";

export const metadata: Metadata = {
  title: `Collections | ${BRAND.name}`,
  description: `Explore curated fashion collections at ${BRAND.name}.`,
};

export default async function CollectionsPage() {
  const { collections, pageInfo } = await getCollectionsPage({ first: 20 });

  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <section className="relative min-h-[360px] border-b border-brand-clay/15 md:min-h-[420px]">
        <Image
          src={IMAGES.banners.promoSplit}
          alt="Apni Dukan curated fashion collections"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-night/90 via-brand-burgundy/70 to-brand-burgundy/35" />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[420px] md:py-28">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            Curated Collections
          </p>
          <h1 className="font-cormorant text-6xl leading-[1.05] font-medium text-brand-oatmilk md:text-8xl">
            Explore Every Edit
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-jakarta text-sm leading-relaxed text-brand-oatmilk/75 md:text-base">
            Shop by category at {BRAND.name} — women&apos;s, men&apos;s, dresses, footwear and more.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-14 md:py-20">
        <CollectionsInfiniteGrid
          initialCollections={collections}
          initialPageInfo={pageInfo}
        />
      </section>
    </main>
  );
}
