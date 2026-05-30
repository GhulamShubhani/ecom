

'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
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


export default function Navbar({ items }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
    <AnnouncementBar />
      <header className={cn('sticky top-9 z-40 border-b border-brand-red/30 bg-brand-black/95 backdrop-blur-md')}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-200 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="font-heading text-2xl tracking-wide text-white">
            APNA DUKAN
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {HOME_NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium tracking-[0.12em] uppercase text-gray-300 transition-colors duration-300 hover:text-brand-red"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Search */}
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

            <button aria-label="Wishlist" className="text-gray-300 transition-colors hover:text-brand-red">
              <Heart className="h-5 w-5" />
            </button>

            <CartModal />
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-brand-charcoal p-6">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-heading text-xl text-white">VELVETLUX</p>
              <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {HOME_NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.12em] text-gray-200 transition-colors hover:text-brand-red"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      ) : null}
    </>
  );
}