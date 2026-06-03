import Link from 'next/link';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import { cn } from '@/lib/utils';

const CATEGORY_EMOJIS = ['👗', '👜', '👒', '🛍️', '✨', '💎'];

async function getCategoryTiles() {
  const collections = await getCollections();
  const usableCollections = collections
    .filter((collection) => collection.handle && collection.title.toLowerCase() !== 'all')
    .slice(0, 6);

  const withCounts = await Promise.all(
    usableCollections.map(async (collection, index) => {
      const products = await getCollectionProducts({
        collection: collection.handle,
        sortKey: 'BEST_SELLING',
      });

      return {
        id: collection.handle,
        name: collection.title,
        emoji: CATEGORY_EMOJIS[index] ?? '✨',
        count: products.length,
        href: collection.path,
      };
    })
  );

  return withCounts;
}

export default async function CategoryGrid() {
  const categories = await getCategoryTiles();

  return (
    <section className={cn('bg-brand-black py-20')}>
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-heading mb-4 text-center text-4xl text-white md:text-5xl">Shop By Category</h2>
        <p className="mb-14 text-center text-gray-400">Explore stylish dresses, clothing, belts, and bags designed for every occasion.</p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group cursor-pointer rounded-2xl border border-brand-gray bg-brand-charcoal p-8 text-center transition-all duration-300 hover:border-brand-red/60 hover:shadow-[0_0_25px_rgba(204,0,0,0.3)]"
            >
              <p className="mb-4 text-5xl">{category.emoji}</p>
              <h3 className="text-lg font-semibold text-white transition group-hover:text-brand-red">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{category.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

