'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/types/nav';

function isStickyNavActive(href: string, pathname: string) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type MobileStickyNavProps = {
  items: NavLink[];
};

export default function MobileStickyNav({ items }: MobileStickyNavProps) {
  const pathname = usePathname();

  if (!items.length) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile category shortcuts"
      className="border-b border-brand-clay/15 bg-white md:hidden"
    >
      <div
        className={cn(
          'no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5',
          'scroll-smooth snap-x snap-mandatory',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        )}
      >
        {items.map((item) => {
          const active = isStickyNavActive(item.href, pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'shrink-0 snap-start rounded-full px-4 py-2 font-jakarta text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200',
                active
                  ? 'bg-brand-burgundy text-brand-oatmilk'
                  : 'bg-brand-sand text-brand-burgundy/80 hover:bg-brand-sand/80 hover:text-brand-burgundy',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
