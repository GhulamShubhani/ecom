import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";
import { ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Shop the Collection",
  description: "Browse our full fashion collection — dresses, clothing, bags, belts, and more.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const { sort, q: searchValue } = resolvedSearchParams as {
    [key: string]: string;
  };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length === 1 ? "style" : "styles";

  return (
    <div>
      {searchValue ? (
        <p className="mb-6 text-sm text-neutral-400">
          {products.length === 0 ? (
            <>No styles found for <span className="text-white">&quot;{searchValue}&quot;</span></>
          ) : (
            <>
              Showing <span className="text-white">{products.length} {resultsText}</span> for{" "}
              <span className="text-white">&quot;{searchValue}&quot;</span>
            </>
          )}
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
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
              ? "Try a different search term or explore our full collection below."
              : "Discover our curated selection of dresses, clothing, bags, and accessories."}
          </p>
          <a
            href="/search"
            className="mt-2 rounded-full border border-brand-red px-6 py-2.5 text-sm font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
          >
            Explore All Styles →
          </a>
        </div>
      )}
    </div>
  );
}
