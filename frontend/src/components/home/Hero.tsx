import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { HERO_LOOKS } from '@/data/products';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-cream-100">
      <div className="relative h-[calc(100vh-104px)] min-h-[560px] w-full">
        <Image
          src={HERO_LOOKS[0].image}
          alt={HERO_LOOKS[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft global tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-50/15 via-transparent to-cream-50/15" />

        {/* Centered text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream-50">
          <h1 className="font-serif font-light leading-[0.95] drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]">
            <span className="block text-[clamp(2.25rem,5vw,4.5rem)] italic font-extralight">
              dressed for
            </span>
            <span className="mt-1 block text-[clamp(2.75rem,8vw,7rem)] tracking-tight uppercase">
              SUMMER
            </span>
            <span className="block text-[clamp(2.75rem,8vw,7rem)] tracking-tight uppercase">
              OCCASIONS
            </span>
          </h1>

          <Link
            href="/search?q=summer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-cream-50/80 bg-cream-50/10 px-7 py-3 text-[12px] uppercase tracking-wider2 text-cream-50 backdrop-blur-sm transition-colors duration-300 ease-soft hover:bg-cream-50 hover:text-ink"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
            Discover
          </Link>
        </div>
      </div>
    </section>
  );
}
