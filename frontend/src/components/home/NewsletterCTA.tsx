import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export function NewsletterCTA() {
  return (
    <section className="bg-cream-50 py-14 md:py-20">
      <div className="container-page">
        <div className="grid gap-6 rounded-3xl border border-ink/10 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-100 p-8 md:grid-cols-12 md:gap-8 md:p-12">
          <div className="md:col-span-7">
            <p className="eyebrow">Get 15% off</p>
            <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
              Your next favourite piece — before it sells out
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink/70">
              Join the newsletter for early access, curated drops, and a welcome
              discount. (Hook this up to your email provider later — UI is ready.)
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Email</span>
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50"
                  strokeWidth={1.5}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-12 w-full rounded-full border border-ink/15 bg-cream-50 pl-11 pr-4 text-sm text-ink outline-none transition-shadow focus:ring-2 focus:ring-ink/20"
                />
              </label>
              <button type="button" className="btn-solid h-12 px-7">
                Sign up
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-ink/60">
                No spam. Unsubscribe anytime.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider2 text-ink"
              >
                Browse now <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

