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
    const timer = window.setTimeout(() => {
      setValue(searchParams?.get("q") ?? "");
      lastPushedRef.current = searchParams?.get("q") ?? "";
    }, 0);
    return () => window.clearTimeout(timer);
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
        placeholder="Search dresses, denim, accessories..."
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-brand h-10 pr-11 text-xs"
      />
      <div className="pointer-events-none absolute top-0 right-0 mr-4 flex h-full items-center text-brand-burgundy/45">
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
        placeholder="Search dresses, denim, accessories..."
        className="input-brand h-10 pr-11 text-xs"
      />
      <div className="pointer-events-none absolute top-0 right-0 mr-4 flex h-full items-center text-brand-burgundy/45">
        <SearchIcon className="h-4 w-4" />
      </div>
    </form>
  );
}