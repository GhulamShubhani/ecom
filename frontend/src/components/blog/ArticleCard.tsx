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
  /** `vertical` = image on top (grids); `horizontal` = image beside copy. */
  orientation?: 'vertical' | 'horizontal';
};

// Re-exported for backwards compatibility with existing imports.
export { articleHref };

export default function ArticleCard({
  article,
  index = 0,
  className,
  priority,
  orientation = 'vertical',
}: Props) {
  const href = articleHref(article);
  const image = journalImage(article, index);
  const excerpt = journalExcerpt(article);
  const isHorizontal = orientation === 'horizontal';

  return (
    <article
      className={cn(
        'group font-jakarta relative overflow-hidden rounded-[24px] border border-[#D6A090]/12 bg-[#1A1012] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D6A090]/35 hover:shadow-[0_30px_70px_-40px_rgba(214,160,144,0.45)]',
        className
      )}
    >
      <Link
        href={href}
        aria-label={article.title}
        className={cn('flex h-full', isHorizontal ? 'flex-col sm:flex-row' : 'flex-col')}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-linear-to-br from-[#4A1525] via-[#2A0F16] to-[#120A0C]',
            isHorizontal
              ? 'aspect-16/10 w-full sm:aspect-auto sm:w-2/5 sm:min-h-44'
              : 'aspect-16/11 w-full'
          )}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes={
              isHorizontal
                ? '(max-width: 640px) 100vw, 240px'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            priority={priority}
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#120A0C]/55 via-transparent to-transparent" />
        </div>

        <div
          className={cn(
            'flex flex-1 flex-col p-6',
            isHorizontal && 'justify-center sm:p-6'
          )}
        >
          {/* <span className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-[#D3B38F] uppercase">
            {category}
          </span> */}

          <h3 className="font-cormorant mb-3 line-clamp-2 text-2xl leading-[1.12] font-medium text-[#FAF6F0] transition-colors duration-300 group-hover:text-[#D6A090]">
            {article.title}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[#FAF6F0]/55">
            {excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-[#D6A090] uppercase transition-colors duration-300 group-hover:text-[#FAF6F0]">
              Read More
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="text-[11px] tracking-wide text-[#FAF6F0]/35">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
