import { IMAGES } from "@/constants/images";

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
  | "heroBestsellers"
  | "heroFavorites"
  | "heroBrand"
  | "heroCouples"
  | "heroHer"
  | "heroHim"
  | "forHer"
  | "forHim"
  | "forCouples"
  | "forKink"
  | "dresses"
  | "newArrivals",
  AudienceCollectionConfig
> = {
  heroHer: {
    slug: "for-her",
    handleCandidates: ["heroHer"],
    titleCandidates: ["heroHer"],
    eyebrow: "For Her",
    heroTitle: "For Her",
    heroDescription: "Premium women's fashion — dresses, tops, denim and seasonal edits.",
    accentClass: "text-brand-clay",
    gradientClass: "from-brand-clay/40",
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: "Editorial Collection",
    rowAccentClass: "text-brand-clay",
  },
  heroFavorites: {
    slug: "bestsellers",
    handleCandidates: ["heroFavorites"],
    titleCandidates: ["heroFavorites"],
    eyebrow: "For Favorites",
    heroTitle: "Favourites",
    heroDescription: "Handpicked styles our customers love most.",
    accentClass: "text-brand-clay",
    gradientClass: "from-brand-clay/40",
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: "Editorial Collection",
    rowAccentClass: "text-brand-clay",
  },
  heroBrand: {
    slug: "accessories",
    handleCandidates: ["heroBrand"],
    titleCandidates: ["heroBrand"],
    eyebrow: "For Brand",
    heroTitle: "Brand Edit",
    heroDescription: "Curated looks from the labels you trust.",
    accentClass: "text-brand-clay",
    gradientClass: "from-brand-clay/40",
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: "Editorial Collection",
    rowAccentClass: "text-brand-clay",
  },
  heroHim: {
    slug: "for-him",
    handleCandidates: ["heroHim"],
    titleCandidates: ["heroHim"],
    eyebrow: "For Him",
    heroTitle: "For Him",
    heroDescription: "Refined menswear — shirts, denim, outerwear and everyday essentials.",
    accentClass: "text-brand-champagne",
    gradientClass: "from-brand-champagne/40",
    heroImage: IMAGES.editorial.forHim,
    rowSubtitle: "Refined Essentials",
    rowAccentClass: "text-brand-champagne",
  },
  heroCouples: {
    slug: "clothing",
    handleCandidates: ["heroCouples"],
    titleCandidates: ["heroCouples"],
    eyebrow: "For Couples",
    heroTitle: "For Couples",
    heroDescription: "Coordinated styles made for two.",
    accentClass: "text-brand-burgundy",
    gradientClass: "from-brand-burgundy/30",
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: "Shared Rituals",
    rowAccentClass: "text-brand-burgundy",
    tagFallback: "tag:audience:par",
  },
  heroBestsellers: {
    slug: "bestsellers",
    handleCandidates: ["heroBestsellers"],
    titleCandidates: ["heroBestsellers"],
    eyebrow: "For Bestsellers",
    heroTitle: "Bestsellers",
    heroDescription: "Our most-loved pieces, chosen by shoppers like you.",
    accentClass: "text-brand-burgundy",
    gradientClass: "from-brand-burgundy/30",
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: "Shared Rituals",
    rowAccentClass: "text-brand-burgundy",
    tagFallback: "tag:audience:par",
  },
  forCouples: {
    slug: "accessories",
    handleCandidates: ["for-par", "til-par"],
    titleCandidates: ["For Par", "Til Par"],
    eyebrow: "For Couples",
    heroTitle: "For Couples",
    heroDescription: "Coordinated styles made for two.",
    accentClass: "text-brand-burgundy",
    gradientClass: "from-brand-burgundy/30",
    heroImage: IMAGES.editorial.forCouples,
    rowSubtitle: "Shared Rituals",
    rowAccentClass: "text-brand-burgundy",
    tagFallback: "tag:audience:par",
  },
  forHer: {
    slug: "for-her",
    handleCandidates: ["for-her", "til-henne"],
    titleCandidates: ["For Her", "Til Henne"],
    eyebrow: "For Her",
    heroTitle: "For Her",
    heroDescription: "Premium women's fashion — dresses, tops, denim and seasonal edits.",
    accentClass: "text-brand-clay",
    gradientClass: "from-brand-clay/40",
    heroImage: IMAGES.editorial.forHer,
    rowSubtitle: "Editorial Collection",
    rowAccentClass: "text-brand-clay",
  },
  forHim: {
    slug: "for-him",
    handleCandidates: ["for-him", "for-ham", "til-han", "til-ham"],
    titleCandidates: ["For him", "For Han", "Til Han"],
    eyebrow: "For Him",
    heroTitle: "For Him",
    heroDescription: "Refined menswear — shirts, denim, outerwear and everyday essentials.",
    accentClass: "text-brand-champagne",
    gradientClass: "from-brand-champagne/40",
    heroImage: IMAGES.editorial.forHim,
    rowSubtitle: "Refined Essentials",
    rowAccentClass: "text-brand-champagne",
  },
  forKink: {
    slug: "for-kink",
    handleCandidates: ["kink", "for-kink"],
    titleCandidates: ["Kink", "For Kink"],
    eyebrow: "For Kink",
    heroTitle: "For Kink",
    heroDescription: "Bold styles for confident expression.",
    accentClass: "text-brand-clay",
    gradientClass: "from-brand-clay/35",
    heroImage: IMAGES.editorial.essentials,
    rowSubtitle: "Bold Exploration",
    rowAccentClass: "text-brand-clay",
  },
  dresses: {
    slug: "dresses",
    handleCandidates: ["dresses"],
    titleCandidates: ["Dresses", "dresses"],
    eyebrow: "Curated Collection",
    heroTitle: "Dresses",
    heroDescription:
      "Elegant dresses for every occasion — evening wear, day dresses and seasonal silhouettes designed to make you feel confident.",
    accentClass: "text-brand-champagne",
    gradientClass: "from-brand-clay/40",
    heroImage: IMAGES.collections.dresses,
    rowSubtitle: "Every Occasion",
    rowAccentClass: "text-brand-clay",
    tagFallback: "tag:collection:dresses",
  },
  newArrivals: {
    slug: "for-kink",
    handleCandidates: ["new-arrivals"],
    titleCandidates: ["New Arrivals", "New arrivals", "new-arrivals"],
    eyebrow: "Just Landed",
    heroTitle: "New Arrivals",
    heroDescription:
      "The latest clothing, footwear and accessories — fresh styles added every week. Be the first to wear what's new.",
    accentClass: "text-brand-champagne",
    gradientClass: "from-brand-burgundy/30",
    heroImage: IMAGES.collections.newArrivals,
    rowSubtitle: "Fresh Styles",
    rowAccentClass: "text-brand-burgundy",
    tagFallback: "tag:collection:new-arrivals",
  },
};

/** Homepage "Most Loved Essentials" section — title & description from Shopify */
export const MOST_LOVED_ESSENTIALS: CollectionLookupConfig = {
  handleCandidates: ["most-loved-essentials", "bestsellers", "most-loved"],
  titleCandidates: ["Most Loved Essentials", "Bestsellers", "Most Loved"],
};

export function getAudienceConfigByHandle(handle: string) {
  const normalized = handle.trim().toLowerCase();

  return Object.values(AUDIENCE_COLLECTIONS).find((config) =>
    config.handleCandidates.some((candidate) => candidate.toLowerCase() === normalized)
  );
}
