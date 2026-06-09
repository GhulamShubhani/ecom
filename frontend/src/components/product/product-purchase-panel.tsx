"use client";

import { Product } from "@/lib/shopify/types";
import VariantSelector from "./variant-selector";
import QuantitySelector from "./quantity-selector";
import { ProductAvailability, ProductPrice } from "./product-price";
import { AddToCart } from "../cart/add-to-cart";
import { BuyNowButton } from "./buy-now-button";
import { AddToWishlist } from "./add-to-wishlist";
import { useProduct } from "./product-context";
import { cn } from "@/lib/utils";

type ProductPurchasePanelProps = {
  product: Product;
  compact?: boolean;
  showActions?: boolean;
  className?: string;
};

export function ProductPurchasePanel({
  product,
  compact = false,
  showActions = true,
  className,
}: ProductPurchasePanelProps) {
  const { quantity, setQuantity } = useProduct();
  const categoryLabel =
    product.collections[0]?.title ?? product.vendor ?? "Premium Fashion";

  return (
    <div
      className={cn(
        compact
          ? "space-y-4"
          : "flex h-full flex-col rounded-3xl border border-brand-clay/15 bg-white/80 p-6 shadow-[0_25px_70px_-55px_rgba(74,21,37,0.55)] backdrop-blur-sm md:p-8",
        className
      )}
    >
      {!compact ? (
        <p className="mb-3 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
          {categoryLabel}
        </p>
      ) : null}

      <h1
        className={
          compact
            ? "font-cormorant text-xl leading-tight font-medium text-brand-burgundy"
            : "font-cormorant mb-3 text-2xl leading-tight font-medium text-brand-burgundy md:text-3xl lg:text-4xl"
        }
      >
        {product.title}
      </h1>

      <div
        className={
          compact
            ? "space-y-3"
            : "mb-5 space-y-3 border-b border-brand-clay/15 pb-5"
        }
      >
        <ProductPrice product={product} />
        <ProductAvailability product={product} />
      </div>

      <VariantSelector options={product.options} variants={product.variants} />

      <div className={compact ? "mb-4" : "mb-5"}>
        <div className="flex items-end gap-3">
          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
            className="min-w-0 flex-1"
          />
          {!compact ? (
            <AddToWishlist productHandle={product.handle} compact />
          ) : null}
        </div>
      </div>

      {showActions ? (
        <div className="mt-auto flex flex-col gap-3">
          <AddToCart product={product} quantity={quantity} />
          <BuyNowButton product={product} quantity={quantity} />
        </div>
      ) : null}
    </div>
  );
}
