import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FAVOURITES } from '@/data/products';

function money(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function FeaturedPicks() {
  const items = FAVOURITES.slice(0, 6);

  return (
    <section className="bg-cream-100 py-12 md:py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Bestsellers</p>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
              Most-loved right now
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink/70">
              A clean, scrollable selection like Amor’s “mest solgte” section —
              but with more breathing room and a softer palette.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider2 text-ink"
          >
            View all <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-8 -mx-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          <div className="flex min-w-full gap-4 md:gap-5">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/search?q=${encodeURIComponent(p.name)}`}
                className="group w-[240px] flex-none md:w-[260px]"
              >
                <div className="overflow-hidden rounded-3xl border border-ink/10 bg-cream-50">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                    />
                    {p.tag ? (
                      <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider2 text-ink ring-1 ring-ink/10 backdrop-blur-sm">
                        {p.tag}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="truncate text-[12px] uppercase tracking-wider2 text-ink/65">
                      {p.hasMoreColors ? 'More colours available' : 'Ready to wear'}
                    </p>
                    <div className="mt-1 flex items-baseline justify-between gap-3">
                      <h3 className="truncate font-serif text-xl font-light tracking-tight text-ink">
                        {p.name}
                      </h3>
                      <span className="shrink-0 text-sm text-ink/80">
                        {money(p.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

