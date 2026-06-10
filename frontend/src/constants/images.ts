/**
 * Local brand images for Apni Dukan — served from /public/images.
 */
const local = (path: string) => `/images/${path}`;

const banners = {
  hero: local('banners/hero-main.jpg'),
  overlay: local('banners/banner-overlay.jpg'),
  promoSplit: local('banners/promo-split.jpg'),
} as const;

const pages = {
  about: local('pages/about-hero.jpg'),
  contact: local('pages/contact-hero.jpg'),
} as const;

const products = {
  fallback: local('products/product-fallback.jpg'),
} as const;

const editorial = {
  forHer: local('editorial/for-her.jpg'),
  forHim: local('editorial/for-him.jpg'),
  forCouples: local('editorial/for-couples.jpg'),
  essentials: local('editorial/essentials.jpg'),
} as const;

const collections = {
  dresses:
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1600&q=80',
  newArrivals:
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
} as const;

/** Rotating pool for legacy mock product cards. */
const productCards = [
  products.fallback,
  editorial.forHer,
  editorial.forHim,
  editorial.forCouples,
  editorial.essentials,
  banners.promoSplit,
] as const;

export const IMAGES = {
  banners,
  pages,
  products,
  editorial,
  collections,
  productCards,
} as const;

export function productCardImage(index: number): string {
  return productCards[index % productCards.length];
}
