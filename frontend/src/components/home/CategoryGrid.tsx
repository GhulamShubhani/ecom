import Link from 'next/link';
import Image from 'next/image';
import { getCollectionsPage, getCollectionProducts } from '@/lib/shopify';
import { cn } from '@/lib/utils';

// async function getCategoryTiles() {
//   const { collections } = await getCollectionsPage({ first: 5 });

//   return collections.map((collection) => ({
//     id: collection.handle,
//     name: collection.title,
//     image: collection.image?.url ?? null,
//     imageAlt: collection.image?.altText || collection.title,
//     count: collection.productCount,
//     href: collection.path,
//   }));
// }

// async function getCategoryTiles() {
//   const pageResponse = await getCollectionsPage({ first: 5 });
//   const allCollections = await getCollections();


//   const collections = allCollections
//     .filter((collection) => collection.handle !== '') // remove "All"
//     .filter((collection) => !collection.handle.startsWith('hidden'))
//     .slice(0, 5);

//   return collections.map((collection) => ({
//     id: collection.handle,
//     name: collection.title,
//     image: collection.image?.url ?? null,
//     imageAlt: collection.image?.altText || collection.title,
//     count: collection.productCount ?? 0,
//     href: collection.path ?? `/collections/${collection.handle}`,
//   }));
// }

async function getCategoryTiles() {
  const { collections } = await getCollectionsPage({ first: 20 });

  const categories = await Promise.all(
    collections.slice(0, 5).map(async (collection) => {
      const products = await getCollectionProducts({
        collection: collection.handle,
      });

      return {
        id: collection.handle,
        name: collection.title,
        image: collection.image?.url ?? null,
        imageAlt: collection.image?.altText || collection.title,
        count: products.length,
        href: collection.path ?? `/collections/${collection.handle}`,
      };
    })
  );

  return categories;
}

export default async function CategoryGrid() {
  const categories = await getCategoryTiles();

  return (
    <section className={cn('bg-brand-oatmilk py-24')}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">Curated Edits</p>
          <h2 className="font-cormorant text-5xl leading-tight font-medium text-brand-burgundy md:text-6xl">Shop By Category</h2>
          <p className="mt-5 font-jakarta text-sm leading-relaxed text-brand-burgundy/60">
            Editorial collections spanning dresses, denim, tailoring and seasonal essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                'group hover-lift relative min-h-84 overflow-hidden rounded-3xl border border-brand-clay/15 bg-brand-night shadow-[0_30px_80px_-52px_rgba(74,21,37,0.55)]',
                index === 0 && 'md:col-span-2'
              )}
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-85 transition-transform duration-500 ease-soft group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-linear-to-t from-brand-night via-brand-night/45 to-transparent" />
              <div className="relative flex h-full min-h-84 flex-col justify-end p-8">
                <p className="mb-3 text-[10px] font-semibold tracking-[0.34em] text-brand-champagne uppercase">
                  {category.count} products
                </p>
                <h3 className="font-cormorant text-4xl font-medium text-brand-oatmilk transition-colors group-hover:text-brand-clay">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/collections"
            className="rounded-full border border-brand-burgundy bg-brand-burgundy px-8 py-3 font-jakarta text-[11px] font-semibold tracking-[0.28em] text-brand-oatmilk uppercase shadow-[0_22px_55px_-38px_rgba(74,21,37,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-night hover:text-brand-clay"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}

