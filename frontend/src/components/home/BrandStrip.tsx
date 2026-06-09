import { RefreshCw, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const guarantees = [
  { icon: Truck, title: 'Fast Delivery', text: 'Complimentary shipping on orders over $99.' },
  { icon: RefreshCw, title: 'Easy Returns', text: '30-day returns on unworn items with tags attached.' },
  { icon: ShieldCheck, title: 'Secure Checkout', text: 'Protected payments and trusted delivery partners.' },
  { icon: Sparkles, title: '100-Day Promise', text: 'Price-match support before and after purchase.' },
] as const;

export default async function BrandStrip() {
  return (
    <section className={cn('border-y border-brand-clay/15 bg-brand-sand/70 py-20')}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
            Quality, Considered
          </p>
          <h2 className="font-cormorant text-4xl font-medium text-brand-burgundy md:text-5xl">
            Designed for effortless confidence
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-brand-clay/15 bg-white/70 p-6 shadow-[0_24px_55px_-45px_rgba(74,21,37,0.45)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-burgundy text-brand-champagne">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-cormorant text-2xl font-medium text-brand-burgundy">{title}</h3>
              <p className="mt-2 font-jakarta text-sm leading-relaxed text-brand-burgundy/60">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
