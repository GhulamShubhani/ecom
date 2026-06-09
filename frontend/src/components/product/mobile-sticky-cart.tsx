"use client";

import { Product } from "@/lib/shopify/types";
import { AddToCart } from "../cart/add-to-cart";
import { BuyNowButton } from "./buy-now-button";
import { ProductPrice } from "./product-price";
import { useProduct } from "./product-context";

export function MobileStickyCart({ product }: { product: Product }) {
  const { quantity } = useProduct();

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-clay/20 bg-brand-oatmilk/95 px-4 py-3 shadow-[0_-12px_40px_-20px_rgba(74,21,37,0.35)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3">
        <ProductPrice product={product} />
        <div className="grid grid-cols-2 gap-2">
          <AddToCart product={product} quantity={quantity} />
          <BuyNowButton product={product} quantity={quantity} />
        </div>
      </div>
    </div>
  );
}
