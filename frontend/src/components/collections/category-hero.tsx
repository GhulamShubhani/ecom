import Image from "next/image";
import Link from "next/link";
import Prose from "@/components/prose";
import { cn } from "@/lib/utils";

type CategoryHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  imageSrc: string;
  imageAlt: string;
  accentClass?: string;
  productCount?: string;
  breadcrumbs?: { label: string; href?: string }[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export default function CategoryHero({
  eyebrow,
  title,
  description,
  descriptionHtml,
  imageSrc,
  imageAlt,
  accentClass = "text-brand-champagne",
  productCount,
  breadcrumbs,
  ctaHref = "#products",
  ctaLabel = "Shop All",
  className,
}: CategoryHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[320px] overflow-hidden border-b border-brand-clay/15 md:min-h-[400px]",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-brand-night/90 via-brand-burgundy/75 to-brand-burgundy/45" />

      <div className="relative mx-auto flex min-h-[320px] max-w-7xl flex-col justify-center px-6 py-20 md:min-h-[400px] md:py-24">
        {breadcrumbs?.length ? (
          <nav className="mb-8 flex flex-wrap items-center gap-3 font-jakarta text-xs font-semibold tracking-[0.22em] text-brand-oatmilk/70 uppercase">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-3">
                {index > 0 ? <span>/</span> : null}
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-brand-clay">
                    {item.label}
                  </Link>
                ) : (
                  <span className={accentClass}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <p
          className={cn(
            "mb-4 font-jakarta text-[11px] font-semibold uppercase tracking-[0.4em]",
            accentClass
          )}
        >
          {eyebrow}
        </p>

        <h1 className="max-w-4xl font-cormorant text-5xl leading-[1.05] font-medium text-brand-oatmilk md:text-7xl">
          {title}
        </h1>

        {productCount ? (
          <p className="mt-4 font-jakarta text-[11px] font-semibold tracking-[0.34em] text-brand-champagne uppercase">
            {productCount}
          </p>
        ) : null}

        {descriptionHtml ? (
          <Prose
            html={descriptionHtml}
            className="mt-6 max-w-2xl prose-p:font-jakarta prose-p:text-sm prose-p:leading-relaxed prose-p:text-brand-oatmilk/75 md:prose-p:text-base"
          />
        ) : description ? (
          <p className="mt-6 max-w-2xl font-jakarta text-sm leading-relaxed text-brand-oatmilk/75 md:text-base">
            {description}
          </p>
        ) : null}

        <a href={ctaHref} className="btn-brand mt-8 w-fit">
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
