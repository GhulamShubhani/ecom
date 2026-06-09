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
  heroTitle: string;
  heroDescription: string;
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
  'forHer' | 'forHim' | 'forCouples' | 'forKink',
  AudienceCollectionConfig
> = {
  forHer: {
    slug: 'for-her',
    handleCandidates: ['for-her', 'women', 'heroHenne'],
    titleCandidates: ['For Her', 'Women', 'heroHenne'],
    eyebrow: 'Women',
    heroTitle: "Women's Fashion",
    heroDescription:
      'Dresses, tops, denim and seasonal edits — curated styles with premium fabrics and everyday polish.',
    accentClass: 'text-brand-clay',
    gradientClass: 'from-brand-clay/40',
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: 'Season Edit',
    rowAccentClass: 'text-brand-clay',
  },
  forHim: {
    slug: 'for-him',
    handleCandidates: ['for-him', 'men', 'heroHan'],
    titleCandidates: ['For Him', 'Men', 'heroHan'],
    eyebrow: 'Men',
    heroTitle: "Men's Style",
    heroDescription:
      'Tailored essentials, smart casuals and refined layers built for comfort and confidence.',
    accentClass: 'text-brand-champagne',
    gradientClass: 'from-brand-champagne/40',
    heroImage: IMAGES.editorial.forHim,
    rowSubtitle: 'Tailored Essentials',
    rowAccentClass: 'text-brand-champagne',
  },
  forCouples: {
    slug: 'for-couples',
    handleCandidates: ['dresses', 'for-couples', 'heroPar'],
    titleCandidates: ['Dresses', 'For Couples', 'heroPar'],
    eyebrow: 'Dresses',
    heroTitle: 'Dresses & Occasion Wear',
    heroDescription:
      'Evening gowns, midi dresses and polished looks for celebrations, parties and special nights out.',
    accentClass: 'text-brand-burgundy',
    gradientClass: 'from-brand-burgundy/30',
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: 'Occasion & Evening',
    rowAccentClass: 'text-brand-burgundy',
    tagFallback: 'tag:collection:dresses',
  },
  forKink: {
    slug: 'for-kink',
    handleCandidates: ['new-arrivals', 'new-in', 'for-kink'],
    titleCandidates: ['New Arrivals', 'New In', 'For Kink'],
    tagFallback: 'tag:collection:new-arrivals',
    eyebrow: 'New Arrivals',
    heroTitle: 'New Arrivals',
    heroDescription:
      'Fresh drops and just-landed pieces — be the first to shop the latest edit from Apni Dukan.',
    accentClass: 'text-brand-clay',
    gradientClass: 'from-brand-clay/35',
    heroImage: IMAGES.editorial.essentials,
    rowSubtitle: 'Just Landed',
    rowAccentClass: 'text-brand-clay',
  },
};

/** Homepage "Most Loved Essentials" section — title & description from Shopify */
export const MOST_LOVED_ESSENTIALS: CollectionLookupConfig = {
  handleCandidates: ['most-loved-essentials', 'bestsellers', 'most-loved'],
  titleCandidates: ['Most Loved Essentials', 'Bestsellers', 'Most Loved'],
};
