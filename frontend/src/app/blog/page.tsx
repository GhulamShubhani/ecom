import Link from 'next/link';
import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Fashion Blog | Apni Dukan',
  description:
    'Explore fashion tips, outfit guides, and styling inspiration for dresses, clothing, belts, and bags.',
};

const blogImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80',
];

export default function BlogPage() {
  return (
    <main className="bg-brand-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7f1d1d33,transparent_35%),linear-gradient(180deg,#111111,#050505)]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-2 text-sm font-medium text-brand-red">
            <Sparkles className="h-4 w-4" />
            Fashion Stories & Style Guides
          </div>

          <h1 className="font-heading mx-auto max-w-4xl text-4xl leading-tight font-bold md:text-6xl">
            Get inspired with style tips for every occasion
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Explore simple fashion guides, outfit ideas, and styling advice for
            dresses, clothing, belts, and bags.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-neon hover:text-black"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={cn('px-6 pb-20')}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-heading text-3xl font-bold md:text-5xl">
                Latest Fashion Guides
              </h2>
              <p className="mt-3 max-w-xl text-gray-400">
                Read our latest tips and guides to upgrade your everyday look
                with confidence.
              </p>
            </div>

            <Link
              href="/search?sort=latest-desc"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition hover:text-brand-neon"
            >
              View New Arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {BLOG_POSTS.map((post, index) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-3xl border border-brand-gray bg-brand-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-2xl hover:shadow-brand-red/10"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-800 to-brand-gray">
                  <img
                    src={blogImages[index % blogImages.length]}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 rounded-full bg-brand-red px-3 py-1 text-xs font-semibold text-white">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wide text-gray-400 uppercase">
                    <CalendarDays className="h-4 w-4 text-brand-red" />
                    {post.date}
                  </div>

                  <h3 className="mb-3 text-xl leading-snug font-semibold text-white transition group-hover:text-brand-red">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/search?q=${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition hover:text-brand-neon"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-brand-gray bg-brand-charcoal p-8 text-center md:p-12">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Ready to refresh your wardrobe?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Discover stylish dresses, clothing, belts, and bags designed for
            everyday confidence.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-neon hover:text-black"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}