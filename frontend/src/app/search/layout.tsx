import Collections from "@/components/layout/search/collections";
import FilterList from "@/components/layout/search/filter";
import { sorting } from "@/lib/constants";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Page header */}
      <div className="border-b border-neutral-800 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-screen-2xl">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Explore
          </p>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Shop the Collection
          </h1>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-6 md:flex-row md:px-6">
        {/* Collections sidebar */}
        <div className="order-first w-full flex-none md:max-w-[150px]">
          <Collections />
        </div>

        {/* Products grid */}
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>

        {/* Sort filter */}
        <div className="order-none flex-none md:order-last md:w-[150px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </div>
  );
}
