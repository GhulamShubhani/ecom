export const SITE_CONFIG = {
  name: 'Apni Dukan',
  description:
    'Discover stylish dresses, clothing, belts, and bags for every occasion. Shop the latest fashion at Apni Dukan.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/og.jpg',
  links: {
    instagram: 'https://instagram.com/',
    pinterest: 'https://pinterest.com/',
  },
} as const;
