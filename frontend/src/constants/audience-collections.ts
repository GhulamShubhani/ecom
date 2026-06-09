import { IMAGES } from '@/constants/images';

export type CollectionLookupConfig = {
  /** Preferred Shopify handles, tried in order */
  handleCandidates: string[];
  /** Collection titles to match when handles differ */
  titleCandidates: string[];
};

export type AudienceCollectionConfig = CollectionLookupConfig & {
  slug: string;
  eyebrow: string;
  accentClass: string;
  gradientClass: string;
  heroImage: string;
  /** Homepage row subtitle */
  rowSubtitle: string;
  rowAccentClass: string;
  /** Used when the collection is not published to the Storefront API */
  tagFallback?: string;
};

export const AUDIENCE_COLLECTIONS: Record<
  'heroHer' | 'forHer' | 'heroHim' | 'forHim' | 'heroCouples' | 'forCouples' | 'heroBestsellers' | 'forKink',
  AudienceCollectionConfig
> = {
  heroHer: {
    slug: 'hero-her',
    handleCandidates: ['heroHenne'],
    titleCandidates: ['heroHenne'],
    eyebrow: 'For Her',
    accentClass: 'text-brand-clay',
    gradientClass: 'from-brand-clay/40',
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: 'Editorial Collection',
    rowAccentClass: 'text-brand-clay',
  },
  forHer: {
    slug: 'for-her',
    handleCandidates: ['for-henne', 'til-henne'],
    titleCandidates: ['For Henne', 'Til Henne'],
    eyebrow: 'For Her',
    accentClass: 'text-brand-clay',
    gradientClass: 'from-brand-clay/40',
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: 'Editorial Collection',
    rowAccentClass: 'text-brand-clay',
  },
  forHim: {
    slug: 'for-him',
    handleCandidates: ['for-han', 'for-ham', 'til-han', 'til-ham'],
    titleCandidates: ['For ham', 'For Han', 'Til Han'],
    eyebrow: 'For Him',
    accentClass: 'text-brand-champagne',
    gradientClass: 'from-brand-champagne/40',
    heroImage: IMAGES.editorial.forHim,
    rowSubtitle: 'Refined Essentials',
    rowAccentClass: 'text-brand-champagne',
  },
  heroHim: {
    slug: 'hero-him',
    handleCandidates: ['heroHan'],
    titleCandidates: ['heroHan'],
    eyebrow: 'For Him',
    accentClass: 'text-brand-champagne',
    gradientClass: 'from-brand-champagne/40',
    heroImage: IMAGES.editorial.forHim,
    rowSubtitle: 'Refined Essentials',
    rowAccentClass: 'text-brand-champagne',
  },
  forCouples: {
    slug: 'for-couples',
    handleCandidates: ['for-par', 'til-par'],
    titleCandidates: ['For Par', 'Til Par'],
    eyebrow: 'For Couples',
    accentClass: 'text-brand-burgundy',
    gradientClass: 'from-brand-burgundy/30',
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: 'Shared Rituals',
    rowAccentClass: 'text-brand-burgundy',
    tagFallback: 'tag:audience:par',
  },
  heroCouples: {
    slug: 'hero-couples',
    handleCandidates: ['heroPar'],
    titleCandidates: ['heroPar'],
    eyebrow: 'For Couples',
    accentClass: 'text-brand-burgundy',
    gradientClass: 'from-brand-burgundy/30',
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: 'Shared Rituals',
    rowAccentClass: 'text-brand-burgundy',
    tagFallback: 'tag:audience:par',
  },
  heroBestsellers: {
    slug: 'for-couples',
    handleCandidates: ['heroPar'],
    titleCandidates: ['heroPar'],
    eyebrow: 'For Couples',
    accentClass: 'text-brand-burgundy',
    gradientClass: 'from-brand-burgundy/30',
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: 'Shared Rituals',
    rowAccentClass: 'text-brand-burgundy',
    tagFallback: 'tag:audience:par',
  },
  forKink: {
    slug: 'for-kink',
    handleCandidates: ['kink', 'for-kink'],
    titleCandidates: ['Kink', 'For Kink'],
    eyebrow: 'For Kink',
    accentClass: 'text-brand-clay',
    gradientClass: 'from-brand-clay/35',
    heroImage: IMAGES.editorial.essentials,
    rowSubtitle: 'Bold Exploration',
    rowAccentClass: 'text-brand-clay',
  },
};

/** Homepage "Most Loved Essentials" section — title & description from Shopify */
export const MOST_LOVED_ESSENTIALS: CollectionLookupConfig = {
  handleCandidates: ['most-loved-essentials', 'bestsellers', 'most-loved'],
  titleCandidates: ['Most Loved Essentials', 'Bestsellers', 'Most Loved'],
};
