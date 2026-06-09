import { AUDIENCE_COLLECTIONS } from '@/constants/audience-collections';

/** Common Shopify menu labels (e.g. Norwegian/Danish) → audience page slug */
const MENU_TITLE_ALIASES: Record<string, string> = {
  'for henne': 'for-her',
  'til henne': 'for-her',
  'for her': 'for-her',
  'for ham': 'for-him',
  'til han': 'for-him',
  'for him': 'for-him',
  'for par': 'for-couples',
  'til par': 'for-couples',
  'for couples': 'for-couples',
  'for kink': 'for-kink',
  kink: 'for-kink',
};

function buildAudienceSlugLookup(): Record<string, string> {
  const lookup: Record<string, string> = {};

  for (const config of Object.values(AUDIENCE_COLLECTIONS)) {
    lookup[config.slug] = config.slug;

    for (const handle of config.handleCandidates) {
      lookup[handle.toLowerCase()] = config.slug;
    }

    for (const title of config.titleCandidates) {
      lookup[title.toLowerCase()] = config.slug;
    }

    lookup[config.eyebrow.toLowerCase()] = config.slug;
  }

  for (const [alias, slug] of Object.entries(MENU_TITLE_ALIASES)) {
    lookup[alias] = slug;
  }

  return lookup;
}

const AUDIENCE_SLUG_LOOKUP = buildAudienceSlugLookup();

function normalizeMenuPath(path: string): string {
  let normalized = path.trim();

  if (normalized.startsWith('http')) {
    try {
      normalized = new URL(normalized).pathname;
    } catch {
      // keep original path
    }
  }

  return normalized.split('?')[0].split('#')[0];
}

/**
 * Maps Shopify menu URLs (often /search/heroHenne or /collections/heroHenne)
 * to audience category routes (/for-her, /for-him, /for-couples) so mobile
 * sticky nav uses the same pages and APIs as the main navbar.
 */
export function resolveAudienceMenuPath(path: string, title?: string): string {
  const normalized = normalizeMenuPath(path);
  const segments = normalized.split('/').filter(Boolean);

  for (const segment of segments) {
    const slug = AUDIENCE_SLUG_LOOKUP[segment.toLowerCase()];
    if (slug) {
      return `/${slug}`;
    }
  }

  if (title) {
    const slug = AUDIENCE_SLUG_LOOKUP[title.trim().toLowerCase()];
    if (slug) {
      return `/${slug}`;
    }
  }

  return normalized.startsWith('/') ? normalized : `/${normalized}`;
}
