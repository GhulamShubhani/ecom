import Image from "next/image";
import Collections from "@/components/layout/search/collections";
import FilterList from "@/components/layout/search/filter";
import { IMAGES } from "@/constants/images";
import { sorting } from "@/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <section className="relative min-h-[320px] border-b border-brand-clay/15 md:min-h-[380px]">
        <Image
          src={IMAGES.banners.overlay}
          alt="Browse the Apni Dukan fashion catalogue"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-night/88 via-brand-burgundy/72 to-brand-burgundy/45" />
        <div className="relative mx-auto flex min-h-[320px] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[380px] md:py-24">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            Boutique Catalogue
          </p>
          <h1 className="font-cormorant text-5xl leading-[1.05] font-medium text-brand-oatmilk md:text-7xl">
            Explore The Edit
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-jakarta text-sm leading-relaxed text-brand-oatmilk/75 md:text-base">
            Shop clothing, dresses, footwear and accessories — curated styles for women and men.
          </p>
        </div>
      </section>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-6 py-12 md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[170px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
        <div className="order-none flex-none md:order-last md:w-[170px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </main>
  );
}
