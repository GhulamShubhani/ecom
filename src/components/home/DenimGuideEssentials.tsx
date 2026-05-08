import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EDITORIAL_IMAGES } from '@/data/products';

const blocks = [
  {
    eyebrow: 'Our',
    title: 'Denim Guide',
    description: 'Find your perfect fit — silhouettes, washes, and styling notes.',
    href: '/stories/denim-guide',
    image: EDITORIAL_IMAGES.denimGuide,
  },
  {
    eyebrow: 'Discover',
    title: 'Essentials',
    description: 'Everyday staples crafted from soft cotton, silk and wool.',
    href: '/products/essentials',
    image: EDITORIAL_IMAGES.essentials,
  },
] as const;

export function DenimGuideEssentials() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {blocks.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-cream-100 md:aspect-[4/5]"
            >
              <Image
                src={b.image}
                alt={`${b.eyebrow} ${b.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-cream-50 sm:p-10">
                <div>
                  <p className="text-[11px] uppercase tracking-widest2 opacity-80">{b.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-4xl font-light italic sm:text-5xl">
                    {b.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm opacity-90">{b.description}</p>
                </div>

                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream-50/70 transition-colors group-hover:bg-cream-50 group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
