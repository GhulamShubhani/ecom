import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Package, ShieldCheck, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

const heroImage = IMAGES.banners.hero;

export default function HeroSection() {
  return (
    <section className={cn('relative min-h-screen overflow-hidden bg-brand-night')}>
      <Image
        src={heroImage}
        alt="Woman in contemporary fashion walking through a city street"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-br from-brand-night/95 via-brand-burgundy/65 to-brand-clay/20" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-brand-oatmilk to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-28">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            {BRAND.name}
          </p>
          <h1 className="font-cormorant mb-7 text-6xl leading-[0.95] font-medium text-brand-oatmilk md:text-8xl">
            Fashion for <span className="italic text-brand-clay">everyone</span>.
          </h1>
          <p className="mb-9 max-w-xl font-jakarta text-lg leading-relaxed text-brand-oatmilk/75 md:text-xl">
            Clothing, footwear and accessories for women and men — curated styles, fair prices, and delivery across India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="btn-brand-outline"
            >
              Explore The Collection
            </Link>
            <Link
              href="/search?sort=trending-desc"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-jakarta text-xs font-semibold tracking-wider2 text-brand-oatmilk underline-offset-8 transition-colors hover:text-brand-champagne hover:underline"
            >
              View Bestsellers
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 font-jakarta text-xs text-brand-oatmilk/65">
            <span className="inline-flex items-center gap-2">
              <Package className="h-4 w-4 text-brand-champagne" />
              Easy Returns
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-champagne" />
              Fast Delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-champagne" />
              Premium Fabrics
            </span>
          </div>
        </div>
      </div>

      <ChevronDown className="absolute bottom-8 left-1/2 z-10 h-7 w-7 -translate-x-1/2 animate-bounce text-brand-burgundy/40" />
    </section>
  );
}
