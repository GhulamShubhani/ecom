"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu as MenuIcon,
} from "lucide-react";
import { DarkThemeToggle } from "flowbite-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import  AnnouncementBar  from "./AnnouncementBar";
import type { MegaMenuKey, NavLink } from "@/types/nav";

const CLOSE_DELAY_MS = 140;

type HeaderProps = {
  items: NavLink[];
};

export function Header({ items }: HeaderProps) {
  const [openKey, setOpenKey] = useState<MegaMenuKey | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenKey(null);
    }, CLOSE_DELAY_MS);
  };

  const openMenu = (key: MegaMenuKey) => {
    cancelClose();
    setOpenKey(key);
  };

  const closeMenuImmediately = () => {
    cancelClose();
    setOpenKey(null);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <AnnouncementBar />

        <header
          className="border-b border-ink/10 bg-cream-50/95 backdrop-blur supports-backdrop-filter:bg-cream-50/85"
          onMouseLeave={scheduleClose}
        >
          <div className="container-page relative flex h-[72px] items-center justify-between gap-4">
            {/* Left — primary nav (desktop) */}
            <nav className="hidden items-center gap-7 lg:flex">
              {items.map((link) =>
                link.megaMenu ? (
                  <button
                    key={link.href}
                    type="button"
                    onMouseEnter={() => openMenu(link.megaMenu as MegaMenuKey)}
                    onFocus={() => openMenu(link.megaMenu as MegaMenuKey)}
                    className={cn(
                      "link-underline text-[12px] uppercase tracking-wider2 text-ink",
                      openKey === link.megaMenu &&
                        "after:scale-x-100 after:origin-bottom-left",
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={closeMenuImmediately}
                    onFocus={closeMenuImmediately}
                    className="link-underline text-[12px] uppercase tracking-wider2 text-ink"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            {/* Center — wordmark */}
            {/* <Link
              href="/"
              onMouseEnter={closeMenuImmediately}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-[20px] tracking-[0.22em] text-ink lg:text-[22px]"
              aria-label="FEELME-shop — Home"
            >
              FEELME&nbsp;SHOP
            </Link> */}
            <Link
                href={"/"}
                prefetch={true}
                onMouseEnter={closeMenuImmediately}
                className="mx-2 flex w-full items-center justify-center md:w-auto lg:mx-6"
              >
                {/* <Logo /> */}
                <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:flex lg:items-center lg:gap-3">
                  <span>Apni</span>
                  <span className="text-brand-clay italic">Dukan</span>
                </div>
              </Link>

            {/* Right — utilities */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
              <button
                type="button"
                className="hidden text-[11px] uppercase tracking-wider2 text-ink lg:inline-flex"
                aria-label="Currency"
              >
                IN&nbsp;(USD)
              </button>
              

              <button
                type="button"
                aria-label="Search"
                className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label="Wishlist"
                className="hidden rounded-full p-2 text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label="Account"
                className="hidden rounded-full p-2 text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                aria-label="Cart"
                className="relative inline-flex items-center gap-1 rounded-full p-2 text-ink transition-colors hover:bg-ink/5"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                <span className="hidden text-[11px] uppercase tracking-wider2 lg:inline">
                  Cart&nbsp;(0)
                </span>
              </button>

              <DarkThemeToggle />
            </div>
          </div>
        </header>
      </div>

      <MegaMenu
        openKey={openKey}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      />
    </>
  );
}
