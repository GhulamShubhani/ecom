export const BRAND = {
  name: 'Apni Dukan',
  tagline: 'Your shop, your style.',
  microTagline: 'Fashion for everyone.',
  description:
    'Apni Dukan is your trusted online fashion store — curated clothing, footwear, accessories and everyday essentials with quality you can count on.',
  email: 'support@apnidukan.in',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra · Pan-India delivery',
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
      { label: 'Women', href: '/for-her' },
      { label: 'Men', href: '/for-him' },
      { label: 'Dresses', href: '/collections/dresses' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'All Products', href: '/search' },
      { label: 'Bestsellers', href: '/collections/bestsellers' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping & Delivery', href: '/contact' },
      { label: 'Returns & Exchanges', href: '/contact' },
      { label: 'Track Order', href: '/search' },
      { label: 'Size Guide', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export const PAYMENT_METHODS = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD', 'Net Banking'] as const;
