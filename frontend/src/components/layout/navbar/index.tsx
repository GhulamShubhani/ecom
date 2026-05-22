"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Search as SearchIcon, User, Heart, ShoppingBag } from "lucide-react";
import {
  DarkThemeToggle,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { MEGA_MENU } from "@/constants/nav";
import type { MegaMenuKey, NavLink } from "@/types/nav";
import { AnnouncementBar } from "../AnnouncementBar";
import Search, { SearchSkeleton } from "./search";
import LogoSquare from "@/components/logo-square";

type NavbarProps = {
  items: NavLink[];
};

const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />
      <MegaMenu className="border-b border-ink/10 bg-cream-50 dark:border-gray-700 dark:bg-gray-900">
        <NavbarBrand as={Link} href="/">
          <span className="self-center whitespace-nowrap font-serif text-xl font-semibold uppercase tracking-[0.22em] text-ink dark:text-white">
            {/* Playme Shop */}
             <LogoSquare />
          </span>
        </NavbarBrand>

        <div className="order-2 ml-auto flex items-center gap-2 md:ml-0">
          <DarkThemeToggle />
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          {items.map((item) => {
            const megaMenuKey = item.megaMenu;
            const content = megaMenuKey
              ? MEGA_MENU[megaMenuKey as MegaMenuKey]
              : null;

            if (content) {
              return (
                <MegaMenuDropdown key={item.href} toggle={<>{item.label}</>}>
                  <div className="mx-auto grid max-w-screen-xl gap-6 px-4 py-5 text-sm text-ink dark:text-gray-300 md:grid-cols-2 md:px-6">
                    {content.sections.map((section, sectionIdx) => (
                      <ul key={sectionIdx} className="space-y-3">
                        {section.title && (
                          <li className="text-[11px] uppercase tracking-widest2 text-ink-muted dark:text-gray-400">
                            {section.title}
                          </li>
                        )}
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="hover:text-accent-berry dark:hover:text-cream-200"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}

                    {content.cta && (
                      <div className="md:col-span-2">
                        <Link
                          href={content.cta.href}
                          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider2 text-ink hover:text-accent-berry dark:text-white"
                        >
                          {content.cta.label} →
                        </Link>
                      </div>
                    )}
                  </div>
                </MegaMenuDropdown>
              );
            }

            return (
              <NavbarLink key={item.href} as={Link} href={item.href}>
                {item.label}
              </NavbarLink>
            );
          })}

          {/* <li className="mt-3 w-full md:hidden">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </li> */}
        </NavbarCollapse>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <div className="hidden md:block md:w-56 lg:w-72">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          <Link
            href="/search"
            aria-label="Search"
            className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            <SearchIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>

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
        </div>
      </MegaMenu>
    </div>
  );
};

export default Navbar;
