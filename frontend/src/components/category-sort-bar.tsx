"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategorySortBarProps = {
  count: number;
  loadedCount?: number;
  currentSort: string;
};

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low-high" },
  { label: "Price: High to Low", value: "price-high-low" },
  { label: "Newest", value: "newest" },
];

export default function CategorySortBar({
  count,
  loadedCount,
  currentSort,
}: CategorySortBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    // reset load more when sorting changes
    params.delete("limit");
    params.delete("cursor");

    router.replace(`${pathname}?${params.toString()}#products`, {
      scroll: false,
    });
  };

  return (
    <div className="sticky top-[7.25rem] z-30 border-b border-brand-clay/15 bg-brand-oatmilk/90 backdrop-blur md:top-[7.25rem]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <p className="font-jakarta text-sm text-brand-burgundy/60">
          Showing{" "}
          <span className="font-semibold text-brand-burgundy">
            {loadedCount ?? count}
          </span>
          {loadedCount != null && loadedCount < count ? (
            <>
              {" "}
              of <span className="font-semibold text-brand-burgundy">{count}</span>
            </>
          ) : null}{" "}
          products
        </p>

        <select
          value={currentSort}
          onChange={(event) => handleSortChange(event.target.value)}
          className="rounded-full border border-brand-clay/30 bg-brand-sand px-4 py-2 font-jakarta text-sm text-brand-burgundy outline-none transition hover:border-brand-clay focus:border-brand-clay"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-brand-oatmilk text-brand-burgundy"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}