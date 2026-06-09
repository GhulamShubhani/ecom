import type { Metadata } from 'next';
import { getArticles } from '@/lib/shopify';
import ArticleCard from '@/components/blog/ArticleCard';
import FeaturedArticleCard from '@/components/blog/FeaturedArticleCard';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Insights, style and inspiration — expert advice, fit guides and fashion stories from the FEELME Journal.',
};

export default async function BlogsPage() {
  const posts = await getArticles({ first: 30 });

  const [featured, ...rest] = posts;
  const sideStories = rest.slice(0, 2);
  const archive = rest.slice(2);

  return (
    <main className="font-jakarta min-h-screen bg-brand-oatmilk text-brand-burgundy">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-128 w-128 -translate-x-1/2 rounded-full bg-brand-clay/20 blur-[140px]" />
        <div className="pointer-events-none absolute top-20 -right-32 h-96 w-96 rounded-full bg-brand-champagne/15 blur-[130px]" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="mb-6 text-[11px] font-semibold tracking-[0.45em] text-brand-champagne uppercase">
            Journal
          </p>
          <h1 className="font-cormorant text-5xl leading-[1.02] font-medium tracking-tight md:text-7xl">
            Insights, Style <span className="text-brand-clay italic">&amp;</span> Inspiration
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-brand-burgundy/65">
            Explore styling advice, fit guides, trend reports and fashion stories designed to help you dress with confidence.
          </p>
        </div>

        <div className="mx-auto h-px max-w-6xl bg-linear-to-r from-transparent via-brand-clay/25 to-transparent" />
      </section>

      {posts.length ? (
        <>
          {/* Cover story + two featured stories */}
          <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <FeaturedArticleCard article={featured} index={0} priority className="lg:h-full" />

              {sideStories.length > 0 && (
                <div className="flex flex-col gap-6 lg:gap-8">
                  {sideStories.map((post, i) => (
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
          </section>

          {/* The full archive */}
          {archive.length > 0 && (
            <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-28">
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="mb-3 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
                    The Archive
                  </p>
                  <h2 className="font-cormorant text-3xl font-medium md:text-4xl">
                    Continue Reading
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {archive.map((post, i) => (
                  <ArticleCard key={post.id} article={post} index={i + 3} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-lg rounded-[24px] border border-brand-clay/15 bg-white/70 p-10 text-center">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
              Coming Soon
            </p>
            <h2 className="font-cormorant mb-3 text-3xl font-medium text-brand-burgundy">
              The Journal is being written
            </h2>
            <p className="text-sm leading-relaxed text-brand-burgundy/60">
              We&apos;re crafting styling guides, trend reports and fashion stories.
              Check back soon for our first edition.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
