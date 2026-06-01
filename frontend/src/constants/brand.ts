export const BRAND = {
  name: 'PLAY ME',
  tagline: 'Pleasure, Perfected.',
  description:
    'Premium intimate essentials designed for confidence, comfort and unforgettable experiences.',
  email: 'support@playme.shop',
  phone: '+47 21 00 00 00',
  address: 'Designed in Oslo · Shipped discreetly across Scandinavia',
  social: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/',
  },
} as const;

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'For Her', href: '/for-her' },
      { label: 'For Him', href: '/for-him' },
      { label: 'For Couples', href: '/for-couples' },
      { label: 'For Kink', href: '/for-kink' },
      { label: 'All Products', href: '/search' },
      { label: 'Bestsellers', href: '/search?sort=trending-desc' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Discreet Delivery', href: '/contact' },
      { label: 'Returns & Refunds', href: '/contact' },
      { label: 'Track Order', href: '/search' },
      { label: 'FAQ', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Blog', href: '/search' },
    ],
  },
];

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'BNPL'] as const;
