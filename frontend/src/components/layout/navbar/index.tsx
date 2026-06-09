'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search as SearchIcon, User, X } from 'lucide-react';
import { HOME_NAV_LINKS } from '@/lib/data';
import { BRAND } from '@/constants/brand';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/brand/brand-logo';
import { BrandWordmark } from '@/components/brand/brand-wordmark';
import Search, { SearchSkeleton } from './search';
import CartModal from '@/components/cart/modal';
import MobileStickyNav from './mobile-sticky-nav';
import type { NavLink } from '@/types/nav';

type NavbarProps = {
  items?: NavLink[];
  mobileStickyItems?: NavLink[];
};

function isLinkActive(href: string, pathname: string) {
  if (href === '/') {
    return (
      pathname === '/' ||
      pathname.startsWith('/product') ||
      pathname.startsWith('/search')
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navLinkClass = (active: boolean) =>
  cn(
    'group relative inline-flex shrink-0 items-center whitespace-nowrap py-1 font-jakarta text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
    active
      ? 'font-semibold text-brand-burgundy'
      : 'font-medium text-brand-burgundy/65 hover:text-brand-burgundy'
  );

const underlineClass = (active: boolean) =>
  cn(
    'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-brand-champagne transition-transform duration-300 ease-out',
    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
  );

export default function Navbar({ items, mobileStickyItems = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = items?.length ? items : HOME_NAV_LINKS;

  return (
    <>
      <div className="sticky top-0 z-40">
        <header className="border-b border-brand-clay/15 bg-brand-oatmilk/90 backdrop-blur-xl">
          <div className="relative mx-auto flex h-[var(--navbar-height)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu trigger */}
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="nav-icon-btn border border-brand-clay/30 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop: logo + navigation */}
          <div className="hidden min-w-0 flex-1 items-center gap-8 md:flex lg:gap-10">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 text-brand-burgundy transition-colors duration-300 hover:text-brand-clay"
              aria-label={`${BRAND.name} home`}
            >
              {/* <BrandLogo className="h-9 w-9 text-brand-champagne transition-colors duration-300 group-hover:text-brand-clay" /> */}
              <BrandWordmark />
            </Link>

            <nav
              aria-label="Primary"
              className="no-scrollbar hidden min-w-0 flex-1 items-center gap-3 overflow-x-auto md:flex lg:gap-5 xl:gap-6"
            >
              {HOME_NAV_LINKS.map((item) => {
                const active = isLinkActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={navLinkClass(active)}
                  >
                    {item.label}
                    <span className={underlineClass(active)} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile: centered logo */}
          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-brand-burgundy transition-colors duration-300 hover:text-brand-clay md:hidden"
            aria-label="Apni Dukan home"
          >
            {/* <BrandLogo className="h-7 w-7 text-brand-champagne" /> */}
            <BrandWordmark size="sm" />
          </Link>

          {/* Utility actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
            <div className="hidden w-52 lg:block xl:w-64">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
            </div>

            <Link
              href="/search"
              aria-label="Search"
              className="nav-icon-btn lg:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>

            <button
              type="button"
              aria-label="Wishlist"
              className="nav-icon-btn hidden sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="nav-icon-btn hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
            </button>

            <CartModal />
          </div>
        </div>
        </header>

        <MobileStickyNav items={mobileStickyItems} />
      </div>

      {mobileMenuOpen ? (
        <>
          <button
            className="fixed inset-0 z-40 bg-brand-night/45 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[min(320px,88vw)] flex-col border-r border-brand-clay/20 bg-brand-oatmilk p-6 shadow-[30px_0_80px_-50px_rgba(74,21,37,0.65)] sm:p-7">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-brand-burgundy"
              >
                {/* <BrandLogo className="h-10 w-10 text-brand-champagne" /> */}
                <BrandWordmark size="lg" />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="nav-icon-btn border border-brand-clay/30"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex flex-col gap-2">
              {HOME_NAV_LINKS.map((item) => {
                const active = isLinkActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-full border px-4 py-3 font-jakarta text-xs tracking-[0.18em] uppercase transition-colors duration-300',
                      active
                        ? 'border-brand-burgundy bg-brand-burgundy text-brand-oatmilk'
                        : 'border-brand-clay/20 text-brand-burgundy/70 hover:border-brand-clay hover:bg-brand-sand/60 hover:text-brand-burgundy'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-brand-clay/15 pt-6">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Wishlist" className="nav-icon-btn">
                  <Heart className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Account" className="nav-icon-btn">
                  <User className="h-5 w-5" />
                </button>
              </div>
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
