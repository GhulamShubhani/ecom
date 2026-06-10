'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants/images';
import { useEffect, useRef, useState } from 'react';


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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className={cn('overflow-hidden bg-brand-oatmilk py-12 md:py-12', className)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div
            className={cn(
              'flex flex-col justify-center transition-all duration-1000 ease-soft',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <p className="mb-4 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
              {label}
            </p>
            <h2 className="font-cormorant text-4xl leading-[1.05] font-medium tracking-tight text-brand-burgundy md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-lg font-jakarta text-base leading-relaxed text-brand-burgundy/65 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={primaryButton.href} className="btn-brand">
                {primaryButton.label}
              </Link>
              <Link href={secondaryButton.href} className="btn-brand-ghost">
                {secondaryButton.label}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={cn(
              'group relative transition-all delay-150 duration-1000 ease-soft',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            )}
          >
            <div className="absolute -inset-4 rounded-4xl bg-brand-champagne/20 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            <div className="hover-lift relative aspect-5/6 overflow-hidden rounded-3xl border border-brand-clay/20 shadow-[0_40px_90px_-50px_rgba(74,21,37,0.55)] md:aspect-6/7 lg:aspect-5/4">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-night/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
