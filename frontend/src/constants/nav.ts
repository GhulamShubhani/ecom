import type { NavLink, MegaMenuContent, MegaMenuKey } from '@/types/nav';

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/search', megaMenu: 'shop' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact' },
];

export const ANNOUNCEMENTS = [
  'Free shipping on orders above ₹999',
  'New styles added every week',
  '7-day easy returns on eligible items',
  'Pan-India delivery',
] as const;

export const MEGA_MENU: Record<MegaMenuKey, MegaMenuContent> = {
  shop: {
    heading: 'Shop',
    sections: [
      {
        links: [
          { label: 'Bestsellers', href: '/collections/bestsellers' },
          { label: 'New arrivals', href: '/collections/new-arrivals' },
          { label: 'Shop all', href: '/search' },
        ],
      },
      {
        links: [
          { label: 'For Her', href: '/for-her', arrow: true },
          { label: 'For Him', href: '/for-him', arrow: true },
          { label: 'Dresses', href: '/for-couples', arrow: true },
          { label: 'Clothing', href: '/collections/clothing', arrow: true },
          { label: 'Jewelry', href: '/collections/jewelry', arrow: true },
          { label: 'Accessories', href: '/collections/accessories', arrow: true },
          { label: 'Shoes', href: '/collections/shoes', arrow: true },
          { label: 'Sale', href: '/collections/sale' },
        ],
      },
    ],
    cta: { label: 'View all collections', href: '/collections' },
  },
  'pihl-denim': {
    heading: 'Denim',
    sections: [
      {
        links: [
          { label: 'Shop denim', href: '/collections/denim' },
          { label: 'For Her', href: '/for-her' },
          { label: 'For Him', href: '/for-him' },
        ],
      },
    ],
    cta: { label: 'Shop denim', href: '/collections/denim' },
  },
};
