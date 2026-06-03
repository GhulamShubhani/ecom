'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search as SearchIcon, X } from 'lucide-react';
import { HOME_NAV_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import Search, { SearchSkeleton } from './search';
import CartModal from '@/components/cart/modal';
import AnnouncementBar from '../AnnouncementBar';
import { Suspense } from 'react';
import type { NavLink } from "@/types/nav";

type NavbarProps = {
  items?: NavLink[];
};

export default function Navbar({ items }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Returns true if the nav link should be considered active.
   * - '/'  → active on exact '/' OR any product page (product pages are under Shop)
   * - '/search*' → active on any search URL
   * - others → starts-with match
   */
  const isActive = (href: string): boolean => {
    const hrefPath = href.split('?')[0];
    if (hrefPath === '/') {
      return pathname === '/' || pathname.startsWith('/product');
    }
    return pathname === hrefPath || pathname.startsWith(hrefPath + '/');
  };

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
          <Link href="/" className="font-heading text-2xl tracking-wide text-white hover:text-brand-red transition-colors duration-300">
            APNA DUKAN
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {HOME_NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300',
                    'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-300 after:origin-center',
                    active
                      ? 'text-brand-red after:scale-x-100'
                      : 'text-gray-300 hover:text-white hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop search */}
            <div className="hidden md:block md:w-56 lg:w-72">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>

            {/* Mobile search icon */}
            <Link
              href="/search"
              aria-label="Search"
              className="text-gray-300 transition-colors hover:text-brand-red md:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>

            {/* Wishlist */}
            <button aria-label="Wishlist" className="text-gray-300 transition-colors hover:text-brand-red">
              <Heart className="h-5 w-5" />
            </button>

            {/* Cart */}
            <CartModal />
          </div>
        </div>
      </header>

      {/* Mobile menu overlay + drawer */}
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
              {HOME_NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
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
            </nav>

            {/* Mobile search */}
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
