"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ListItem } from ".";
import { useEffect, useRef, useState } from "react";
import { ChevronDown  } from "lucide-react";
import { FilterItem } from "./item";

export default function FilterItemDropDown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpenSelect(!openSelect)}
        className="flex w-full items-center justify-between rounded-full border border-brand-clay/30 bg-brand-sand px-4 py-2 font-jakarta text-sm text-brand-burgundy"
      >
        {active}
        <ChevronDown  className="h-4 text-brand-clay" />
      </div>
      {openSelect && (
        <div
          onClick={() => setOpenSelect(false)}
          className="absolute z-40 mt-2 w-full rounded-3xl border border-brand-clay/15 bg-brand-oatmilk p-4 shadow-[0_25px_60px_-45px_rgba(74,21,37,0.6)]"
        >
          {list.map((item: ListItem, i) => (
            <FilterItem item={item} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}