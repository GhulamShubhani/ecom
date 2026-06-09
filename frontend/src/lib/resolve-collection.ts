import { getCollections } from '@/lib/shopify';
import type { Collection } from '@/lib/shopify/types';

export type ResolvedCollection = {
  handle: string;
  collection: Collection;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

/**
 * Resolves a Shopify collection by handle or title so audience pages work even
 * when admin handles differ from route slugs (e.g. for-henne vs til-henne).
 */
export async function resolveCollection(
  handleCandidates: string[] = [],
  titleCandidates: string[] = []
): Promise<ResolvedCollection | null> {
  const collections = (await getCollections()).filter((item) => item.handle);
  const handles = Array.isArray(handleCandidates) ? handleCandidates : [];
  const titles = Array.isArray(titleCandidates) ? titleCandidates : [];

  for (const handle of handles) {
    const match = collections.find((item) => item.handle === handle);
    if (match) {
      return { handle: match.handle, collection: match };
    }
  }

  for (const title of titles) {
    const normalizedTitle = normalize(title);
    const match = collections.find((item) => normalize(item.title) === normalizedTitle);
    if (match) {
      return { handle: match.handle, collection: match };
    }
  }

  for (const title of titles) {
    const normalizedTitle = normalize(title);
    const match = collections.find(
      (item) =>
        normalize(item.title).includes(normalizedTitle) ||
        normalizedTitle.includes(normalize(item.title))
    );
    if (match) {
      return { handle: match.handle, collection: match };
    }
  }

  return null;
}
