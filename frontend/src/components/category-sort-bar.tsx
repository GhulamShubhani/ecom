"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategorySortBarProps = {
  count: number;
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
    <div className="sticky top-0 z-30 border-b border-neutral-800 bg-brand-charcoal/95 backdrop-blur md:top-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <p className="text-sm text-neutral-300">
          Showing <span className="font-semibold text-white">{count}</span>{" "}
          products
        </p>

        <select
          value={currentSort}
          onChange={(event) => handleSortChange(event.target.value)}
          className="rounded-full border border-neutral-700 bg-brand-black px-4 py-2 text-sm text-white outline-none transition hover:border-neutral-500 focus:border-white"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-brand-black text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}