'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Heart, Menu, Search as SearchIcon, X } from 'lucide-react';
import { HOME_NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import Search, { SearchSkeleton } from './search';
import CartModal from '@/components/cart/modal';
import AnnouncementBar from '../AnnouncementBar';
import type { NavLink } from "@/types/nav";

type NavbarProps = {
  items?: NavLink[];
};

/* ─── Active-state logic lives here so it can use useSearchParams ─── */
function NavLinksInner({
  mobile,
  onLinkClick,
}: {
  mobile?: boolean;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Exact match for links with query params (e.g. New Arrivals vs Brands).
   * Plain path links (no query) still use starts-with logic.
   */
  const isActive = (href: string): boolean => {
    const [hrefPath, hrefQuery] = href.split('?');

    if (hrefPath === '/') {
      return pathname === '/' || pathname.startsWith('/product');
    }

    // Path must match first
    if (pathname !== hrefPath && !pathname.startsWith(hrefPath + '/')) {
      return false;
    }

    // No query in the href — path match is enough
    if (!hrefQuery) return true;

    // Href has query params — all of them must match the current URL
    const hrefParams = new URLSearchParams(hrefQuery);
    for (const [key, value] of hrefParams.entries()) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  };

  if (mobile) {
    return (
      <>
        {HOME_NAV_LINKS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.12em] transition-colors',
                active
                  ? 'bg-brand-red/10 text-brand-red font-semibold'
                  : 'text-gray-200 hover:bg-white/5 hover:text-white'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {HOME_NAV_LINKS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'relative text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300',
              'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:scale-x-0',
              'after:bg-brand-red after:transition-transform after:duration-300 after:origin-center',
              active
                ? 'text-brand-red after:scale-x-100'
                : 'text-gray-300 hover:text-white hover:after:scale-x-100'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

/* Minimal fallback shown while Suspense resolves (no active state) */
function NavLinksFallback({ mobile }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <>
        {HOME_NAV_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-lg px-3 py-2.5 text-sm uppercase tracking-[0.12em] text-gray-200"
          >
            {item.label}
          </Link>
        ))}
      </>
    );
  }
  return (
    <>
      {HOME_NAV_LINKS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-xs font-medium tracking-[0.12em] uppercase text-gray-300"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

/* ─── Main Navbar ─────────────────────────────────────────────────── */
export default function Navbar({ items }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-9 z-40 border-b border-brand-red/20 bg-brand-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">

          {/* Mobile menu toggle */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-200 transition-colors hover:text-brand-red md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl tracking-wide text-white hover:text-brand-red transition-colors duration-300"
          >
            APNA DUKAN
          </Link>

          {/* Desktop nav — wrapped in Suspense for useSearchParams */}
          <nav className="hidden items-center gap-6 md:flex">
            <Suspense fallback={<NavLinksFallback />}>
              <NavLinksInner />
            </Suspense>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block md:w-56 lg:w-72">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
            <Link
              href="/search"
              aria-label="Search"
              className="text-gray-300 transition-colors hover:text-brand-red md:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            <button
              aria-label="Wishlist"
              className="text-gray-300 transition-colors hover:text-brand-red"
            >
              <Heart className="h-5 w-5" />
            </button>
            <CartModal />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen ? (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-brand-charcoal p-6">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading text-xl text-white hover:text-brand-red transition-colors"
              >
                APNA DUKAN
              </Link>
              <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              <Suspense fallback={<NavLinksFallback mobile />}>
                <NavLinksInner mobile onLinkClick={() => setMobileMenuOpen(false)} />
              </Suspense>
            </nav>
            <div className="mt-8 border-t border-neutral-800 pt-6">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
