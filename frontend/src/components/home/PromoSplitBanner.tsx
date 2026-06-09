'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants/images';

export type PromoSplitBannerProps = {
  label?: string;
  heading?: string;
  description?: string;
  primaryButton?: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

const DEFAULT_IMAGE = IMAGES.banners.promoSplit;

export default function PromoSplitBanner({
  label = 'SS26 COLLECTION',
  heading = 'Style, defined on your terms',
  description = 'A curated edit of dresses, separates and denim — refined silhouettes, natural fabrics, and the polish of a luxury fashion house.',
  primaryButton = { label: 'Shop Collection', href: '/collections' },
  secondaryButton = { label: 'Our Story', href: '/about-us' },
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Model wearing an elegant floral dress from the SS26 collection',
  className,
}: PromoSplitBannerProps) {
  return (
    <section className={cn('overflow-hidden bg-brand-oatmilk py-20 md:py-28', className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-up flex flex-col justify-center">
            <p className="mb-5 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
              {label}
            </p>
            <h2 className="font-cormorant text-5xl leading-[1.05] font-medium tracking-tight text-brand-burgundy md:text-6xl lg:text-7xl">
              {heading}
            </h2>
            <p className="mt-7 max-w-lg font-jakarta text-base leading-relaxed text-brand-burgundy/65 md:text-lg">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={primaryButton.href} className="btn-brand">
                {primaryButton.label}
              </Link>
              <Link href={secondaryButton.href} className="btn-brand-ghost">
                {secondaryButton.label}
              </Link>
            </div>
          </div>

          <div className="group relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-4 rounded-4xl bg-brand-champagne/20 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            <div className="hover-lift relative aspect-[4/5] min-h-[320px] w-full overflow-hidden rounded-3xl border border-brand-clay/20 shadow-[0_40px_90px_-50px_rgba(74,21,37,0.55)] md:aspect-[5/6] md:min-h-[420px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-soft group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-night/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
