// "use client";

// import Link from "next/link";
// import { Suspense } from "react";
// import { Search as SearchIcon, User, Heart } from "lucide-react";
// import {
//   DarkThemeToggle,
//   MegaMenu,
//   MegaMenuDropdown,
//   NavbarBrand,
//   NavbarCollapse,
//   NavbarLink,
//   NavbarToggle,
// } from "flowbite-react";
// import { MEGA_MENU } from "@/constants/nav";
// import type { MegaMenuKey, NavLink } from "@/types/nav";
// import { AnnouncementBar } from "../AnnouncementBar";
// import Search, { SearchSkeleton } from "./search";
// import LogoSquare from "@/components/logo-square";
// import CartModal from "@/components/cart/modal";


// type NavbarProps = {
//   items: NavLink[];
// };

// const Navbar = ({ items }: NavbarProps) => {
//   return (
//     <div className="sticky top-0 z-50">
//       <AnnouncementBar />
//       <MegaMenu className="border-b border-ink/10 bg-cream-50 dark:border-gray-700 dark:bg-gray-900">
//         <NavbarBrand as={Link} href="/">
//           <span className="self-center whitespace-nowrap font-serif text-xl font-semibold uppercase tracking-[0.22em] text-ink dark:text-white">
//             {/* Playme Shop */}
//              <LogoSquare />
//           </span>
//         </NavbarBrand>

//         <div className="order-2 ml-auto flex items-center gap-2 md:ml-0">
//           <DarkThemeToggle />
//           <NavbarToggle />
//         </div>

//         <NavbarCollapse>
//           {items.map((item) => {
//             const megaMenuKey = item.megaMenu;
//             const content = megaMenuKey
//               ? MEGA_MENU[megaMenuKey as MegaMenuKey]
//               : null;

//             if (content) {
//               return (
//                 <MegaMenuDropdown key={item.href} toggle={<>{item.label}</>}>
//                   <div className="mx-auto grid max-w-screen-xl gap-6 px-4 py-5 text-sm text-ink dark:text-gray-300 md:grid-cols-2 md:px-6">
//                     {content.sections.map((section, sectionIdx) => (
//                       <ul key={sectionIdx} className="space-y-3">
//                         {section.title && (
//                           <li className="text-[11px] uppercase tracking-widest2 text-ink-muted dark:text-gray-400">
//                             {section.title}
//                           </li>
//                         )}
//                         {section.links.map((link) => (
//                           <li key={link.href}>
//                             <Link
//                               href={link.href}
//                               className="hover:text-accent-berry dark:hover:text-cream-200"
//                             >
//                               {link.label}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     ))}

//                     {content.cta && (
//                       <div className="md:col-span-2">
//                         <Link
//                           href={content.cta.href}
//                           className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider2 text-ink hover:text-accent-berry dark:text-white"
//                         >
//                           {content.cta.label} →
//                         </Link>
//                       </div>
//                     )}
//                   </div>
//                 </MegaMenuDropdown>
//               );
//             }

//             return (
//               <NavbarLink key={item.href} as={Link} href={item.href}>
//                 {item.label}
//               </NavbarLink>
//             );
//           })}

//           {/* <li className="mt-3 w-full md:hidden">
//             <Suspense fallback={<SearchSkeleton />}>
//               <Search />
//             </Suspense>
//           </li> */}
//         </NavbarCollapse>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
//           <div className="hidden md:block md:w-56 lg:w-72">
//             <Suspense fallback={<SearchSkeleton />}>
//               <Search />
//             </Suspense>
//           </div>

//           <Link
//             href="/search"
//             aria-label="Search"
//             className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 md:hidden"
//           >
//             <SearchIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
//           </Link>

//           <button
//             type="button"
//             aria-label="Wishlist"
//             className="hidden rounded-full p-2 text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
//           >
//             <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
//           </button>

//           <button
//             type="button"
//             aria-label="Account"
//             className="hidden rounded-full p-2 text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
//           >
//             <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
//           </button>

//           <CartModal />
//         </div>
//       </MegaMenu>
//     </div>
//   );
// };

// export default Navbar;


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