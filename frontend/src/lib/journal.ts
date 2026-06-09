import type { Article } from '@/lib/shopify/types';
import { IMAGES } from '@/constants/images';

const DEFAULT_EXCERPT =
  'Style tips, fit guides and fashion inspiration from Apni Dukan.';

const FALLBACK_IMAGES = [
  IMAGES.editorial.forHer,
  IMAGES.editorial.forHim,
  IMAGES.editorial.forCouples,
  IMAGES.editorial.essentials,
  IMAGES.banners.promoSplit,
  IMAGES.products.fallback,
] as const;

const FALLBACK_ALTS = [
  "Women's fashion edit",
  "Men's fashion edit",
  'Occasion dresses',
  'Wardrobe essentials',
  'Seasonal promotion',
  'Fashion product',
] as const;

const FALLBACK_CATEGORIES = [
  'Style Guide',
  'Fashion Tips',
  'Wardrobe',
  'Occasion Wear',
  'Trends',
  'Essentials',
] as const;

export type JournalImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function articleHref(article: Article) {
  return `/blogs/${article.blog.handle}/${article.handle}`;
}

export function journalImage(article: Article, index = 0): JournalImage {
  if (article.image?.url) {
    return {
      url: article.image.url,
      alt: article.image.altText || article.title,
      width: article.image.width,
      height: article.image.height,
    };
  }

  const slot = index % FALLBACK_IMAGES.length;
  return {
    url: FALLBACK_IMAGES[slot],
    alt: FALLBACK_ALTS[slot],
  };
}

export function journalCategory(article: Article, index = 0) {
  if (article.tags?.length) {
    return article.tags[0];
  }
  return FALLBACK_CATEGORIES[index % FALLBACK_CATEGORIES.length];
}

export function journalExcerpt(article: Article, fallback = DEFAULT_EXCERPT) {
  const text = article.excerpt?.trim() || article.contentHtml?.replace(/<[^>]+>/g, ' ').trim();
  if (!text) return fallback;
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}
