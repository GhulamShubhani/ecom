import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_IMAGES } from '@/data/products';

const TILES = [
  {
    title: 'New arrivals',
    subtitle: 'Seasonal updates, just landed',
    href: '/search?sort=latest-desc',
    image: EDITORIAL_IMAGES.essentials,
  },
  {
    title: 'Occasion edit',
    subtitle: 'Statement pieces for nights out',
    href: '/products/occasion-edit',
    image: EDITORIAL_IMAGES.may17,
  },
  {
    title: 'Denim favourites',
    subtitle: 'Clean lines, soft structure',
    href: '/pihl-denim',
    image: EDITORIAL_IMAGES.pihlDenim,
  },
  {
    title: 'Accessories',
    subtitle: 'Finish the look',
    href: '/search?q=accessories',
    image: EDITORIAL_IMAGES.denimGuide,
  },
] as const;

export function CategoryTiles() {
  return (
    <section className="bg-cream-50 py-12 md:py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Shop by mood</p>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
              Curated categories for every day
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink/70">
              Inspired by editorial storefronts like Amor — but redesigned for a
              cleaner, more premium feel.
            </p>
          </div>
          <Link
            href="/search"
            className="link-underline text-[12px] uppercase tracking-wider2 text-ink"
          >
            Shop all
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {TILES.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-cream-100"
            >
              <div className="relative h-[240px] w-full md:h-[320px]">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-cream-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest2 text-cream-50/85">
                      {tile.subtitle}
                    </p>
                    <h3 className="mt-1 truncate font-serif text-2xl font-light tracking-tight">
                      {tile.title}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/40 bg-cream-50/10 backdrop-blur-sm transition-colors group-hover:bg-cream-50 group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

