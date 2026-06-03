export const BRAND = {
  name: 'Apni Dukan',
  tagline: 'Style, Perfected.',
  description:
    'Premium fashion essentials designed for style, comfort, and everyday confidence.',
  email: 'support@apnidukan.com',
  phone: '+92 300 0000000',
  address: 'Apni Dukan · Fashion for Every Occasion',
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
      { label: 'Dresses', href: '/search?q=dresses' },
      { label: 'Clothing', href: '/search?q=clothing' },
      { label: 'Belts', href: '/search?q=belts' },
      { label: 'Bags', href: '/search?q=bags' },
      { label: 'All Products', href: '/search' },
      { label: 'Bestsellers', href: '/search?sort=trending-desc' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping Info', href: '/contact' },
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
      { label: 'Blog', href: '/blog' },
    ],
  },
];

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'BNPL'] as const;
