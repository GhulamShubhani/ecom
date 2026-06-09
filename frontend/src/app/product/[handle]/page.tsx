import Gallery from "@/components/product/gallery";
import { ProductProvider } from "@/components/product/product-context";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductDetailsSection } from "@/components/product/product-details-section";
import { StickyAddToCartBar } from "@/components/product/sticky-add-to-cart-bar";
import { FrequentlyBoughtTogether } from "@/components/product/frequently-bought-together";
import RelatedProductsCarousel from "@/components/product/related-products-carousel";
import ScrollToTop from "@/components/scroll-to-top";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import {
  getComplementaryProducts,
  getProduct,
  getProductRecommendations,
} from "@/lib/shopify";
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
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
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
      <ScrollToTop />
      <div className="bg-brand-oatmilk pb-[var(--sticky-cart-offset,0px)] transition-[padding] duration-300 ease-soft lg:pb-0">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8 md:py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:items-start lg:gap-12 xl:gap-16">
            {/* Left: gallery, mobile purchase info, description */}
            <div className="min-w-0">
              <Suspense
                fallback={
                  <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-brand-sand" />
                }
              >
                <Gallery
                  images={product.images.map((image: Image) => ({
                    src: image.url,
                    altText: image.altText,
                  }))}
                />
              </Suspense>

              <div className="mt-8 lg:hidden" data-purchase-sentinel>
                <ProductPurchasePanel product={product} />
              </div>

              <ProductDetailsSection product={product} />
            </div>

            {/* Right: sticky purchase panel (desktop) */}
            <aside className="hidden min-w-0 lg:block" data-purchase-sentinel>
              <div className="sticky top-[calc(var(--navbar-height)+1.5rem)]">
                <ProductPurchasePanel product={product} />
              </div>
            </aside>
          </div>

          <Suspense fallback={null}>
            <ComplementaryProductsSection id={product.id} mainProduct={product} />
          </Suspense>
          <Suspense fallback={null}>
            <RelatedProductsSection id={product.id} />
          </Suspense>
        </div>
      </div>

      <StickyAddToCartBar product={product} />
    </ProductProvider>
  );
}

async function ComplementaryProductsSection({
  id,
  mainProduct,
}: {
  id: string;
  mainProduct: Awaited<ReturnType<typeof getProduct>>;
}) {
  const products = await getComplementaryProducts(id);

  if (!products.length || !mainProduct) return null;

  return (
    <FrequentlyBoughtTogether
      mainProduct={mainProduct}
      complementaryProducts={products}
    />
  );
}

async function RelatedProductsSection({ id }: { id: string }) {
  const products = await getProductRecommendations(id, "RELATED");

  if (!products.length) return null;

  return (
    <section className="py-16 md:py-20" aria-labelledby="related-heading">
      <p className="mb-3 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
        Continue Exploring
      </p>
      <h2
        id="related-heading"
        className="font-cormorant mb-8 text-4xl font-medium text-brand-burgundy md:text-5xl"
      >
        You May Also Like
      </h2>
      <RelatedProductsCarousel products={products} visibleCount={4} />
    </section>
  );
}
