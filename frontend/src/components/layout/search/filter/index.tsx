import { SortFilterItem } from "@/lib/constants";
import { FilterItem } from "./item";
import FilterItemDropDown from "./dropdown";

export type PathFilterItem = { title: string; path: string };
export type ListItem = SortFilterItem | PathFilterItem;

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  return (
    <>
      <nav className="rounded-3xl border border-brand-clay/15 bg-white/60 p-4">
        {title ? (
          <h3 className="hidden font-jakarta text-[11px] font-semibold tracking-[0.28em] text-brand-champagne uppercase md:block">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <FilterItemDropDown list={list} />
        </ul>
      </nav>
    </>
  );
}