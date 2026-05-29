import { TRUST_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function TrustStrip() {
  return (
    <section className={cn('bg-brand-charcoal border-t-2 border-brand-red py-10')}>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon className="mb-3 h-8 w-8 text-brand-red" />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

