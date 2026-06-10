'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Gem, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/constants/images';

export type ImageOverlayHighlight = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type ImageOverlayBannerProps = {
  heading?: string;
  description?: string;
  button?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  highlights?: ImageOverlayHighlight[];
  className?: string;
};

const DEFAULT_IMAGE = IMAGES.banners.overlay;

const DEFAULT_HIGHLIGHTS: ImageOverlayHighlight[] = [
  {
    icon: Gem,
    title: 'Premium Fabrics',
    text: 'Natural fibres, soft tailoring and finishes chosen to last.',
  },
  {
    icon: Sparkles,
    title: 'Editorial Design',
    text: 'Runway-inspired silhouettes with everyday wearability.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Quality',
    text: 'Every piece inspected for fit, drape and construction.',
  },
  {
    icon: Heart,
    title: 'Personal Style',
    text: 'A wardrobe experience built around confidence and ease.',
  },
];

export default function ImageOverlayBanner({
  heading = 'Fashion Designed Around You',
  description = 'Premium fabrics, refined silhouettes, and a shopping experience you can trust.',
  button = { label: 'Shop The Edit', href: '/search' },
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Fashion editorial with model in contemporary clothing',
  highlights = DEFAULT_HIGHLIGHTS,
  className,
}: ImageOverlayBannerProps) {
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={cn('relative overflow-hidden', className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[1.2s] ease-soft group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-night/85 via-brand-burgundy/70 to-brand-night/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(211,179,143,0.12)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Overlay copy */}
          <div
            className={cn(
              'mx-auto max-w-3xl text-center transition-all duration-1000 ease-soft',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            )}
          >
            <h2 className="font-cormorant text-4xl leading-tight font-medium text-brand-oatmilk md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-jakarta text-base leading-relaxed text-brand-oatmilk/75 md:text-lg">
              {description}
            </p>
            <Link
              href={button.href}
              className={cn(
                'btn-brand-outline mt-8 inline-flex transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(211,179,143,0.6)]'
              )}
            >
              {button.label}
            </Link>
          </div>

          {/* Feature grid — 4 cols desktop, 2x2 mobile */}
          <div
            className={cn(
              'mt-10 grid grid-cols-2 gap-3 transition-all delay-200 duration-1000 ease-soft md:mt-12 md:gap-4 lg:grid-cols-4',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            {highlights.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-2xl border border-brand-champagne/20 bg-brand-night/40 p-4 backdrop-blur-sm transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-brand-champagne/45 hover:bg-brand-night/55 md:p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-brand-champagne/30 bg-brand-champagne/10 text-brand-champagne transition-colors duration-300 group-hover:bg-brand-champagne/20">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-cormorant text-lg font-medium text-brand-oatmilk md:text-xl">{title}</h3>
                <p className="mt-1.5 font-jakarta text-xs leading-relaxed text-brand-oatmilk/65 md:text-sm">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
