import { TRUST_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function TrustStrip() {
  return (
    <section className={cn('border-y border-brand-clay/15 bg-brand-sand/70 py-12')}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="rounded-3xl border border-brand-clay/15 bg-white/55 p-6 shadow-[0_24px_50px_-42px_rgba(74,21,37,0.45)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-oatmilk text-brand-clay">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-jakarta text-sm font-semibold text-brand-burgundy">{item.title}</h3>
              <p className="mt-2 font-jakarta text-xs leading-relaxed text-brand-burgundy/60">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

