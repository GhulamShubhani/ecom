import Gallery from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductDescription } from "@/components/product/product-description";
import RelatedProductsCarousel from "@/components/product/related-products-carousel";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Image } from "@/lib/shopify/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return notFound();

  return (
    <ProductProvider>
      {/* Scroll to top on every product navigation */}
      <ScrollToTop />

      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-neutral-500">
          <a href="/" className="hover:text-brand-red transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/search" className="hover:text-brand-red transition-colors">Shop</a>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">{product.title}</span>
        </nav>

        {/* Product layout */}
        <div className="flex flex-col rounded-xl border border-neutral-800 bg-[#141414] p-6 md:p-10 lg:flex-row lg:gap-10">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg bg-neutral-900 animate-pulse" />
              }
            >
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>
          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* Related products */}
        <RelatedProducts id={product.id} />
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts?.length) return null;

  return (
    <div className="mt-12 pb-4">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Complete Your Look
          </p>
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            You May Also Like
          </h2>
        </div>
        <a
          href="/search"
          className="text-sm text-neutral-400 transition-colors hover:text-brand-red"
        >
          View all →
        </a>
      </div>
      <RelatedProductsCarousel products={relatedProducts} visibleCount={4} />
    </div>
  );
}
