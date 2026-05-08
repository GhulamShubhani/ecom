import { ArrowRight } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="bg-cream-100 py-14 sm:py-16 lg:py-20">
      <div className="container-page text-center">
        <p className="eyebrow">Newsletter</p>
        <h2 className="mt-4 font-serif text-display-md font-light text-ink">
          Stay in <span className="italic font-extralight">the loop</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance font-serif text-lg italic text-ink-soft">
          Be the first to know about new arrivals, editorials and exclusive offers.
        </p>

        <form className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-ink/20 bg-cream-50 p-1.5 pl-5">
          <input
            type="email"
            required
            placeholder="Your email address"
            aria-label="Email address"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12px] uppercase tracking-wider2 text-cream-50 transition-opacity hover:opacity-90"
          >
            Subscribe <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </section>
  );
}
