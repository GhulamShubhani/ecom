export const SITE_CONFIG = {
  name: 'Camilla Pihl',
  description:
    'Timeless silhouettes and soft tailoring designed for every celebration. Discover the new SS26 collection.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/og.jpg',
  links: {
    instagram: 'https://instagram.com/',
    pinterest: 'https://pinterest.com/',
  },
} as const;
