import { ProductGridPaginated } from "@/components/search/ProductGridPaginated";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Shop the Collection",
  description: "Browse our full fashion collection — dresses, clothing, bags, belts, and more.",
};

/* ─── Page-specific hero banners ─────────────────────────────────── */

function NewArrivalsHero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-brand-red/30 bg-[#0f0f0f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(204,0,0,0.18)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(204,0,0,0.10)_0%,transparent_55%)]" />

      <div className="relative px-6 py-10 md:px-10 md:py-12">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 animate-pulse text-brand-red" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-red">
            Just Dropped
          </span>
        </div>
        <h1 className="font-heading mb-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          New{" "}
          <span className="relative">
            <span className="text-brand-red">Arrivals</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-brand-red/50" />
          </span>
        </h1>
        <p className="mb-8 max-w-md text-base text-neutral-400">
          Fresh styles added every week. Be the first to wear what&apos;s new.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Zap,        label: "Updated Weekly" },
            { icon: Star,       label: "Handpicked Styles" },
            { icon: TrendingUp, label: "Trending Now" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-neutral-300"
            >
              <Icon className="h-3.5 w-3.5 text-brand-red" />
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-14 w-14 overflow-hidden">
        <div className="absolute -right-3.5 -top-3.5 h-14 w-14 rotate-45 bg-brand-red" />
        <span className="absolute right-2 top-2 select-none text-[10px] font-bold uppercase text-white">
          NEW
        </span>
      </div>
    </div>
  );
}

function BrandsHero() {
  const brandLinks = [
    { name: "ZARA",       q: "zara" },
    { name: "H&M",        q: "hm" },
    { name: "MANGO",      q: "mango" },
    { name: "LEVI'S",     q: "levis" },
    { name: "FOREVER 21", q: "forever+21" },
    { name: "GUCCI",      q: "gucci" },
    { name: "PRADA",      q: "prada" },
    { name: "FOSSIL",     q: "fossil" },
  ];

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-neutral-800 bg-[#0f0f0f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,0,0,0.10)_0%,transparent_65%)]" />
      <div className="relative px-6 py-10 md:px-10 md:py-12">
        <div className="mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4 text-brand-red" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-red">
            Premium Labels
          </span>
        </div>
        <h1 className="font-heading mb-3 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Shop by{" "}
          <span className="bg-linear-to-r from-brand-red to-red-400 bg-clip-text text-transparent">
            Brand
          </span>
        </h1>
        <p className="mb-8 max-w-md text-base text-neutral-400">
          Explore curated collections from the world&apos;s most iconic fashion labels.
        </p>
        <div className="flex flex-wrap gap-2">
          {brandLinks.map((brand) => (
            <Link
              key={brand.name}
              href={`/search?q=${brand.q}`}
              className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-300 transition-all duration-200 hover:border-brand-red hover:bg-brand-red/10 hover:text-white"
            >
              {brand.name}
              <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-t border-neutral-800 py-3">
        <div className="flex min-w-max animate-marquee gap-8 px-6 opacity-30">
          {[...brandLinks, ...brandLinks].map((b, i) => (
            <span key={i} className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-white">
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericSearchHero({ query }: { query?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-1 border-b border-neutral-800 pb-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-red">
        Explore
      </p>
      <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
        {query ? `"${query}"` : "Shop the Collection"}
      </h1>
      {!query && (
        <p className="mt-1 text-sm text-neutral-500">
          Discover curated dresses, clothing, bags &amp; accessories.
        </p>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const { sort, q: searchValue } = resolvedSearchParams as {
    [key: string]: string;
  };

  const isNewArrivals = sort === "latest-desc" && !searchValue;
  const isBrands = searchValue === "brands";

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ sortKey, reverse, query: searchValue });
  } catch {
    products = [];
  }

  return (
    <div>
      {/* Page hero */}
      {isNewArrivals ? (
        <NewArrivalsHero />
      ) : isBrands ? (
        <BrandsHero />
      ) : (
        <GenericSearchHero query={searchValue} />
      )}

      {/* Results meta */}
      {searchValue && !isBrands && products.length > 0 ? (
        <p className="mb-6 text-sm text-neutral-400">
          Showing <span className="text-white">{products.length}</span> {products.length === 1 ? "style" : "styles"} for{" "}
          <span className="text-white">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {/* Product grid with pagination */}
      {products.length > 0 ? (
        <ProductGridPaginated products={products} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900">
            <ShoppingBag className="h-9 w-9 text-neutral-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {searchValue ? "No Styles Found" : "Browse Our Collection"}
          </h2>
          <p className="max-w-sm text-sm text-neutral-400">
            {searchValue
              ? "Try a different search term or explore our full collection."
              : "Discover our curated selection of dresses, clothing, bags, and accessories."}
          </p>
          <Link
            href="/search"
            className="mt-2 cursor-pointer rounded-full border border-brand-red px-6 py-2.5 text-sm font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
          >
            Explore All Styles →
          </Link>
        </div>
      )}
    </div>
  );
}
