import { Product } from "@/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";
import { AddToWishlist } from "./add-to-wishlist";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-8 flex flex-col border-b border-brand-clay/15 pb-8">
        <p className="mb-3 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
          Premium Fashion
        </p>
        <h1 className="font-cormorant mb-4 text-5xl leading-tight font-medium text-brand-burgundy md:text-6xl">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-brand-sand px-5 py-2 font-jakarta text-sm font-semibold text-brand-burgundy">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1">
          <AddToCart product={product} />
        </div>
        <AddToWishlist productHandle={product.handle} />
      </div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 font-jakarta text-sm leading-relaxed text-brand-burgundy/70"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}