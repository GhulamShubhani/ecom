export const SITE_CONFIG = {
  name: 'Apni Dukan',
  description:
    'Your trusted online fashion store — clothing, footwear, accessories and wardrobe essentials for women and men with fast delivery across India.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/images/banners/hero-main.jpg',
  links: {
    instagram: 'https://instagram.com/',
    pinterest: 'https://pinterest.com/',
  },
} as const;
