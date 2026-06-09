import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Article } from '@/lib/shopify/types';
import { cn, formatDate } from '@/lib/utils';
import { articleHref, journalExcerpt, journalImage } from '@/lib/journal';

type Props = {
  article: Article;
  index?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Editorial hero card — a large lifestyle image with a warm gradient overlay,
 * category badge and serif headline. Designed to anchor the Journal layout like
 * the cover story of a luxury magazine.
 */
export default function FeaturedArticleCard({
  article,
  index = 0,
  className,
  priority,
}: Props) {
  const href = articleHref(article);
  const image = journalImage(article, index);
  const excerpt = journalExcerpt(article);

  return (
    <article
      className={cn(
        'group font-jakarta relative isolate overflow-hidden rounded-[24px] bg-[#4A1525] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_45px_110px_-45px_rgba(74,21,37,0.85)]',
        className
      )}
    >
      <Link href={href} className="flex h-full min-h-104 flex-col lg:min-h-136" aria-label={article.title}>
        {/* Warm brand gradient sits behind the photo so the card never looks empty */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#4A1525] via-[#2A0F16] to-[#120A0C]" />

        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority={priority}
          className="object-cover opacity-90 transition-transform duration-600 ease-out group-hover:scale-105"
        />

        {/* Cinematic overlay for legible text */}
        <div className="absolute inset-0 bg-linear-to-t from-[#120A0C] via-[#120A0C]/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-[#4A1525]/30 via-transparent to-transparent" />

        <div className="relative mt-auto flex flex-col items-start gap-4 p-7 sm:p-9 lg:p-10">
          {/* <span className="inline-flex items-center rounded-full border border-[#D3B38F]/40 bg-[#120A0C]/40 px-4 py-1.5 text-[10px] font-semibold tracking-[0.32em] text-[#D3B38F] uppercase backdrop-blur-sm">
            {category}
          </span> */}

          <h3 className="font-cormorant max-w-2xl text-3xl leading-[1.05] font-medium text-[#FAF6F0] sm:text-4xl lg:text-5xl">
            {article.title}
          </h3>

          <p className="max-w-xl text-sm leading-relaxed text-[#FAF6F0]/70 sm:text-base">
            {excerpt}
          </p>

          <div className="mt-1 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#D6A090] uppercase transition-colors duration-300 group-hover:text-[#FAF6F0]">
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
            <span className="text-[11px] tracking-wide text-[#FAF6F0]/40">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
