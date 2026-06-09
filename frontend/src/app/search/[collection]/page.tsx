import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts } from "@/lib/shopify";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const { sort } = resolvedSearchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  });

  return (
    <section>
      {products.length === 0 ? (
        <div className="rounded-3xl border border-brand-clay/15 bg-white/70 p-12 text-center">
          <h2 className="font-cormorant text-4xl font-medium text-brand-burgundy">
            No products found
          </h2>
          <p className="mt-3 font-jakarta text-sm text-brand-burgundy/60">
            This collection is being curated. Please check back soon.
          </p>
        </div>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}