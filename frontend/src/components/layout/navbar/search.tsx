"use client";
import { createUrl } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 300;

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") ?? "";

  const [value, setValue] = useState(initialQuery);
  const lastPushedRef = useRef(initialQuery);

  useEffect(() => {
    setValue(searchParams?.get("q") ?? "");
    lastPushedRef.current = searchParams?.get("q") ?? "";
  }, [searchParams]);

  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed === lastPushedRef.current) return;

    const timeout = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams?.toString() ?? "");
      if (trimmed) {
        newParams.set("q", trimmed);
      } else {
        newParams.delete("q");
      }
      lastPushedRef.current = trimmed;
      router.push(createUrl("/search", newParams));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [value, router, searchParams]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    const newParams = new URLSearchParams(searchParams?.toString() ?? "");
    if (trimmed) {
      newParams.set("q", trimmed);
    } else {
      newParams.delete("q");
    }
    lastPushedRef.current = trimmed;
    router.push(createUrl("/search", newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        suppressHydrationWarning
      />
      <div className="pointer-events-none absolute right-0 top-0 mr-3 flex h-full items-center text-ink-muted">
        <SearchIcon className="h-4 w-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        suppressHydrationWarning
      />
      <div className="pointer-events-none absolute right-0 top-0 mr-3 flex h-full items-center text-ink-muted">
        <SearchIcon className="h-4 w-4" />
      </div>
    </form>
  );
}