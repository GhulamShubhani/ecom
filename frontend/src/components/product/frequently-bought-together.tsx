"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { useCart } from "../cart/cart-context";
import { addItems } from "../cart/actions";
import { BundleProductCard } from "./bundle-product-card";
import { BundlePriceSummary } from "./bundle-price-summary";
import { getDefaultVariant, useSelectedVariant } from "./use-selected-variant";

type BundleItem = {
  key: string;
  product: Product;
  variant: ProductVariant | undefined;
};

type FrequentlyBoughtTogetherProps = {
  mainProduct: Product;
  complementaryProducts: Product[];
};

export function FrequentlyBoughtTogether({
  mainProduct,
  complementaryProducts,
}: FrequentlyBoughtTogetherProps) {
  const router = useRouter();
  const { addCartItem, openCart, triggerAddedAnimation, showCartToast } = useCart();
  const mainVariant = useSelectedVariant(mainProduct);
  const [isPending, startTransition] = useTransition();

  const bundleItems: BundleItem[] = useMemo(() => {
    const items: BundleItem[] = [
      {
        key: mainProduct.id,
        product: mainProduct,
        variant: mainVariant,
      },
    ];

    complementaryProducts.slice(0, 2).forEach((product) => {
      items.push({
        key: product.id,
        product,
        variant: getDefaultVariant(product),
      });
    });

    return items;
  }, [mainProduct, mainVariant, complementaryProducts]);

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    () => new Set(bundleItems.map((item) => item.key))
  );

  const selectedItems = bundleItems.filter(
    (item) =>
      selectedKeys.has(item.key) &&
      item.variant?.id &&
      item.variant.availableForSale
  );

  const total = selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.variant!.price.amount),
    0
  );

  const currencyCode =
    selectedItems[0]?.variant?.price.currencyCode ??
    mainProduct.priceRange.minVariantPrice.currencyCode;

  const handleToggle = (key: string, selected: boolean) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  const handleAddSelected = async () => {
    const lines = selectedItems
      .filter((item) => item.variant?.id)
      .map((item) => ({
        selectedVariantId: item.variant!.id,
        quantity: 1,
      }));

    if (!lines.length) return;

    startTransition(() => {
      lines.forEach(({ selectedVariantId, quantity }) => {
        const item = selectedItems.find((i) => i.variant?.id === selectedVariantId);
        if (!item?.variant) return;
        for (let i = 0; i < quantity; i += 1) {
          addCartItem(item.variant, item.product);
        }
      });
    });

    triggerAddedAnimation();
    showCartToast("added");

    await addItems(null, { items: lines });
    openCart();
    router.refresh();
  };

  if (bundleItems.length < 2) return null;

  return (
    <section
      className="py-16 md:py-20"
      aria-labelledby="frequently-bought-together-heading"
    >
      <p className="mb-3 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
        Curated Pairings
      </p>
      <h2
        id="frequently-bought-together-heading"
        className="font-cormorant mb-8 text-4xl font-medium text-brand-burgundy md:text-5xl"
      >
        Frequently Bought Together
      </h2>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap">
          {bundleItems.map((item, index) => (
            <div
              key={item.key}
              className="flex min-w-0 flex-1 items-center gap-4 sm:max-w-none"
            >
              {index > 0 ? (
                <div
                  className="hidden shrink-0 sm:flex sm:h-10 sm:w-10 sm:items-center sm:justify-center sm:rounded-full sm:border sm:border-brand-clay/20 sm:bg-white/80 sm:text-brand-burgundy/40"
                  aria-hidden
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </div>
              ) : null}
              <BundleProductCard
                product={item.product}
                variant={item.variant}
                selected={selectedKeys.has(item.key)}
                onToggle={(selected) => handleToggle(item.key, selected)}
                isMain={index === 0}
              />
            </div>
          ))}
        </div>

        <BundlePriceSummary
          totalAmount={total.toFixed(2)}
          currencyCode={currencyCode}
          itemCount={selectedItems.length}
          disabled={selectedItems.length === 0}
          isPending={isPending}
          onAddToCart={handleAddSelected}
        />
      </div>
    </section>
  );
}
