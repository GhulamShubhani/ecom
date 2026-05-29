import { ShieldCheck, Truck, BadgePercent, Sparkles } from 'lucide-react';

const ITEMS = [
  {
    icon: Truck,
    title: 'Fast delivery',
    description: 'Ships in 1–3 business days',
  },
  {
    icon: ShieldCheck,
    title: 'Secure checkout',
    description: 'Trusted payment providers',
  },
  {
    icon: BadgePercent,
    title: 'Price promise',
    description: 'Great value, always',
  },
  {
    icon: Sparkles,
    title: 'New drops weekly',
    description: 'Fresh edits & essentials',
  },
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-cream-50">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 py-7 md:grid-cols-4 md:gap-6">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-2xl bg-cream-100/70 px-4 py-4 ring-1 ring-ink/5 backdrop-blur-sm"
              >
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-50 ring-1 ring-ink/10">
                  <Icon className="h-[18px] w-[18px] text-ink" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium uppercase tracking-wider2 text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-ink/70">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

