import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/shopify';
import ArticleCard from '@/components/blog/ArticleCard';
import FeaturedArticleCard from '@/components/blog/FeaturedArticleCard';

export default async function BlogSection() {
  const posts = await getArticles({ first: 3 });

  // Hide the whole section when the store has no published articles.
  if (!posts.length) return null;

  const [featured, ...rest] = posts;
  const side = rest.slice(0, 2);

  return (
    <section className="font-jakarta relative overflow-hidden bg-brand-oatmilk py-24 md:py-28">
      {/* Soft ambient warmth in the corners — luxury editorial atmosphere */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-clay/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-champagne/15 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            Journal
          </p>
          <h2 className="font-cormorant text-4xl leading-[1.05] font-medium text-brand-burgundy sm:text-5xl md:text-6xl">
            Insights, Style <span className="text-brand-clay italic">&amp;</span> Inspiration
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-burgundy/60 sm:text-base">
            Explore styling advice, fit guides, trend reports and fashion stories designed to help you dress with confidence.
          </p>
        </div>

        {/* Editorial grid — large feature beside two stacked stories */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <FeaturedArticleCard article={featured} index={0} priority className="lg:h-full" />

          {side.length > 0 && (
            <div className="flex flex-col gap-6 lg:gap-8">
              {side.map((post, i) => (
                <ArticleCard
                  key={post.id}
                  article={post}
                  index={i + 1}
                  orientation="horizontal"
                  className="lg:flex-1"
                />
              ))}
            </div>
          )}
        </div>

        {/* Explore Our Journal CTA */}
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="font-cormorant text-2xl font-medium text-brand-burgundy italic sm:text-3xl">
            Explore Our Journal
          </p>
          <Link
            href="/blogs"
            className="btn-brand-ghost mt-6 gap-2.5"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
