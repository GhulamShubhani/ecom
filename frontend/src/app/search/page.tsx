import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
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
  const resultsText = products.length > 1 ? "results" : "result";
  return (
    <>
      {searchValue ? (
        <p className="mb-8 font-jakarta text-sm text-brand-burgundy/60">
          {products.length === 0
            ? "There are no products that match"
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-semibold text-brand-burgundy">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <div className="rounded-3xl border border-brand-clay/15 bg-white/70 p-12 text-center">
          <h2 className="font-cormorant text-4xl font-medium text-brand-burgundy">No results found</h2>
          <p className="mx-auto mt-3 max-w-md font-jakarta text-sm leading-relaxed text-brand-burgundy/60">
            Try a different search term or browse our curated fashion collections.
          </p>
        </div>
      )}
    </>
  );
}