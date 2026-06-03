import type { NavLink, MegaMenuContent, MegaMenuKey } from '@/types/nav';

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home',        href: '/' },
  { label: 'Shop',        href: '/search' },
  { label: 'New Arrivals', href: '/search?sort=latest-desc' },
  { label: 'Brands',      href: '/search?q=brands' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contact',     href: '/contact' },
  { label: 'About Us',    href: '/about-us' },
];

export const ANNOUNCEMENTS = [
  'Free Shipping on Orders Over $99',
  'New Arrivals Every Week',
  'Easy Returns & Exchanges',
  'Get 15% Off Your First Order',
] as const;

export const MEGA_MENU: Record<MegaMenuKey, MegaMenuContent> = {
  shop: {
    heading: 'Shop',
    sections: [
      {
        links: [
          { label: 'Bestsellers', href: '/products/bestsellers' },
          { label: 'New arrivals', href: '/new-in' },
          { label: 'Shop all',     href: '/products' },
        ],
      },
      {
        links: [
          { label: 'Clothing',    href: '/clothing',    arrow: true },
          { label: 'Jewelry',     href: '/jewelry',     arrow: true },
          { label: 'Accessories', href: '/accessories', arrow: true },
          { label: 'Pihl Denim',  href: '/pihl-denim',  arrow: true },
          { label: 'Curated',     href: '/curated',     arrow: true },
        ],
      },
    ],
    cta: { label: 'View the SS26 lookbook', href: '/stories/ss26' },
  },
  'pihl-denim': {
    heading: 'Pihl Denim',
    sections: [
      {
        links: [
          { label: 'New arrivals', href: '/products/ss-denim' },
          { label: 'Bestsellers',  href: '/pihl-denim/bestsellers' },
          { label: 'Shop all',     href: '/pihl-denim' },
        ],
      },
      {
        links: [
          { label: 'Jeans',       href: '/pihl-denim/jeans',   arrow: true },
          { label: 'Shorts',      href: '/pihl-denim/shorts',  arrow: true },
          { label: 'Skirts',      href: '/pihl-denim/skirts',  arrow: true },
          { label: 'Tops',        href: '/pihl-denim/tops',    arrow: true },
          { label: 'Denim Guide', href: '/stories/denim-guide' },
        ],
      },
    ],
    cta: { label: 'Discover Pihl Denim SS26', href: '/products/ss-denim' },
  },
};
