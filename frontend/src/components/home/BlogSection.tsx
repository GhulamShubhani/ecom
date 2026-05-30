import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function BlogSection() {
  return (
    <section className={cn('bg-brand-black py-20')}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-heading mb-4 text-center text-4xl text-white md:text-5xl">Get Inspired</h2>
        <p className="mb-14 text-center text-gray-400">Tips, guides and styling advice for dresses, clothing, belts, and bags.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-brand-gray bg-brand-charcoal transition-all duration-300 hover:border-brand-red/40"
            >
              <div className="h-44 bg-gradient-to-br from-gray-800 to-brand-gray" />
              <div className="p-5">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-brand-red uppercase">{post.date}</p>
                <h3 className="mb-2 text-base leading-snug font-semibold text-white">{post.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
                <Link href={`/search?q=${post.slug}`} className="text-sm font-medium text-brand-red transition hover:text-brand-neon">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

