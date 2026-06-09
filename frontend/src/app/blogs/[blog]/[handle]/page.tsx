import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, UserRound } from 'lucide-react';
import { getArticle, getArticles } from '@/lib/shopify';
import ArticleCard from '@/components/blog/ArticleCard';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import { journalCategory, journalImage } from '@/lib/journal';
import { formatDate } from '@/lib/utils';

type Params = Promise<{ blog: string; handle: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { blog, handle } = await params;
  const article = await getArticle(blog, handle);

  if (!article) return { title: 'Article not found' };

  const image = article.image?.url;

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt || undefined,
    openGraph: image
      ? {
          type: 'article',
          title: article.title,
          description: article.excerpt || undefined,
          publishedTime: article.publishedAt,
          images: [{ url: image, alt: article.image?.altText || article.title }],
        }
      : undefined,
  };
}

/** Rough reading time from the rendered HTML (presentational only). */
function readingTime(html?: string) {
  if (!html) return 3;
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { blog, handle } = await params;
  const article = await getArticle(blog, handle);

  if (!article) return notFound();

  // A few other recent posts to keep readers browsing.
  const more = (await getArticles({ first: 4 }))
    .filter((post) => post.handle !== article.handle)
    .slice(0, 3);

  const hero = journalImage(article, 0);
  const category = journalCategory(article, 0);
  const minutes = readingTime(article.contentHtml);
  const author = article.authorV2?.name;

  return (
    <main className="font-jakarta min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <ReadingProgress />

      {/* Large editorial hero */}
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-brand-burgundy via-[#2A0F16] to-brand-night" />
        <Image
          src={hero.url}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-night via-brand-night/60 to-brand-night/30" />

        <div className="relative mx-auto max-w-3xl px-6 pt-28 pb-20 text-center md:pt-36 md:pb-28">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold tracking-wider2 text-brand-oatmilk/70 uppercase transition-colors hover:text-brand-champagne"
          >
            <ArrowLeft className="h-4 w-4" />
            The Journal
          </Link>

          <p className="mb-5 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            {category}
          </p>

          <h1 className="font-cormorant text-4xl leading-[1.04] font-medium text-brand-oatmilk md:text-6xl">
            {article.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-wide text-brand-oatmilk/70">
            {author ? (
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-brand-champagne" />
                {author}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-champagne" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-champagne" />
              {minutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Body + sticky share rail */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-12">
          <aside className="mb-10 lg:sticky lg:top-32 lg:mb-0 lg:h-fit">
            <ShareButtons title={article.title} />
          </aside>

          <article className="mx-auto w-full max-w-2xl">
            {article.contentHtml ? (
              <div
                className="prose prose-lg max-w-none prose-headings:[font-family:var(--font-serif)] prose-headings:font-medium prose-headings:text-brand-burgundy prose-p:[font-family:var(--font-jakarta)] prose-p:text-brand-burgundy/80 prose-p:leading-relaxed prose-li:text-brand-burgundy/80 prose-strong:text-brand-burgundy prose-a:text-brand-clay prose-a:no-underline hover:prose-a:text-brand-burgundy prose-img:rounded-3xl prose-blockquote:border-l-2 prose-blockquote:border-brand-clay prose-blockquote:[font-family:var(--font-serif)] prose-blockquote:text-2xl prose-blockquote:text-brand-burgundy prose-blockquote:not-italic"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <p className="text-lg leading-relaxed text-brand-burgundy/70">{article.excerpt}</p>
            )}

            {article.tags?.length ? (
              <div className="mt-12 flex flex-wrap gap-2.5 border-t border-brand-clay/20 pt-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-clay/30 bg-brand-sand/60 px-4 py-1.5 text-xs tracking-wide text-brand-burgundy/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Author section */}
            {author ? (
              <div className="mt-12 flex items-center gap-5 rounded-3xl border border-brand-clay/15 bg-white/70 p-6 shadow-[0_30px_60px_-45px_rgba(74,21,37,0.45)] sm:p-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-burgundy font-cormorant text-2xl font-medium text-brand-champagne">
                  {author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-champagne uppercase">
                    Written by
                  </p>
                  <p className="font-cormorant text-2xl font-medium text-brand-burgundy">{author}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-burgundy/60">
                    Sharing styling advice and fashion insights for the FeelMe community.
                  </p>
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </div>

      {/* Related articles */}
      {more.length ? (
        <section className="border-t border-brand-clay/15 bg-brand-sand/50 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
                  Keep Reading
                </p>
                <h2 className="font-cormorant text-3xl font-medium text-brand-burgundy md:text-4xl">
                  More from the Journal
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden items-center gap-1.5 text-xs font-semibold tracking-wider2 text-brand-burgundy uppercase transition-colors hover:text-brand-clay sm:inline-flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {more.map((post, index) => (
                <ArticleCard key={post.id} article={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
