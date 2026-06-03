import { Product } from "@/lib/shopify/types";
import Price from "../price";
import VariantSelector from "./variant-selector";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";
import { AddToWishlist } from "./add-to-wishlist";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-neutral-800 pb-6">
        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-white">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1">
          <AddToCart product={product} />
        </div>
        <AddToWishlist productHandle={product.handle} />
      </div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-light dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
    </>
  );
}