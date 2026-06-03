import {
  Heart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  RefreshCw,
  Star,
  Users,
  Award,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Apni Dukan',
  description:
    'Learn more about Apni Dukan — your destination for stylish dresses, clothing, belts, and bags for every occasion.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Handpicked Styles',
    description:
      'Every piece in our collection is carefully selected — not just for how it looks, but for how it makes you feel. We curate only the best.',
  },
  {
    icon: Heart,
    title: 'Made for Confidence',
    description:
      'From casual outings to special occasions, our collection is designed to help you dress with confidence and express your unique style.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality You Can Trust',
    description:
      'From dresses to bags, every product is chosen with attention to quality, comfort, and lasting durability. We never compromise on standards.',
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: 'Curated Fashion',
    description: 'Dresses, clothing, belts, and bags — all handpicked for everyday style and every occasion.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick, reliable shipping so your favourite styles reach you without the long wait.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Hassle-free returns and exchanges within 30 days. Your satisfaction is our priority.',
  },
];

const stats = [
  { icon: Users, value: '500+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: '100+', label: 'Curated Styles' },
  { icon: Award, value: '4', label: 'Fashion Categories' },
  { icon: Clock, value: '24/7', label: 'Online Shopping' },
];

const team = [
  {
    name: 'Style Curation',
    role: 'Every item is handpicked by our fashion team for quality and trend-relevance.',
    emoji: '👗',
  },
  {
    name: 'Customer Love',
    role: 'We put our customers first — from the moment you browse to when your order arrives.',
    emoji: '💛',
  },
  {
    name: 'Fashion Forward',
    role: 'We stay ahead of trends to bring you fresh styles across dresses, clothing, and accessories.',
    emoji: '✨',
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-brand-black text-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-brand-gray">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-black to-brand-red/10" />
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-brand-red/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-red/8 blur-[120px]" />

        {/* Decorative floating emojis */}
        <div className="pointer-events-none absolute top-10 left-6 text-7xl opacity-5 select-none rotate-[-10deg]">👗</div>
        <div className="pointer-events-none absolute top-20 right-10 text-6xl opacity-5 select-none rotate-[8deg]">👜</div>
        <div className="pointer-events-none absolute bottom-12 left-1/3 text-5xl opacity-5 select-none">✨</div>
        <div className="pointer-events-none absolute bottom-6 right-1/4 text-5xl opacity-5 select-none rotate-[-6deg]">💎</div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            {/* Left: Text */}
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                <Sparkles className="h-3.5 w-3.5" />
                Our Story
              </span>

              <h1 className="heading-brand mb-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Born from a love of <span className="text-brand-red">style</span>,{' '}
                built for you.
              </h1>

              <p className="mb-4 text-lg leading-relaxed text-gray-300">
                <strong className="text-white">Apni Dukan</strong> was founded with a single
                belief — great fashion should be accessible to everyone. From elegant dresses
                to everyday essentials, we bring you hand-picked styles that make you feel
                confident every single day.
              </p>

              <p className="mb-10 text-base leading-relaxed text-gray-400">
                We started because we believed finding stylish, quality clothing should not be
                complicated or expensive. Every piece in our collection is carefully chosen —
                not just for how it looks, but for how it makes you feel.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-brand-neon hover:text-black"
                >
                  Shop Our Collection
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-gray px-8 py-3.5 text-sm font-semibold text-gray-200 transition hover:border-brand-red/50 hover:text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Image + floating card */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-brand-gray">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                  alt="Apni Dukan fashion collection"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-brand-gray bg-brand-charcoal/95 p-5 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/15 text-2xl">
                    👗
                  </div>
                  <div>
                    <p className="font-semibold text-white">Premium Fashion Essentials</p>
                    <p className="mt-0.5 text-sm text-gray-400">
                      Designed for style, comfort, and everyday confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-b border-brand-gray bg-brand-charcoal/40 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-2xl border border-brand-gray bg-brand-charcoal p-6 text-center transition-all duration-300 hover:border-brand-red/50 hover:shadow-[0_0_25px_rgba(204,0,0,0.15)]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/20 transition group-hover:bg-brand-red/20">
                    <Icon className="h-5 w-5 text-brand-red" />
                  </div>
                  <p className="heading-brand text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-1.5 text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Story Detail ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-3xl border border-brand-gray">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80"
                  alt="Fashion styling"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-3xl border border-brand-gray mt-8">
                <img
                  src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
                  alt="Clothing collection"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 overflow-hidden rounded-3xl border border-brand-gray h-40">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4fb2ea59da8a?auto=format&fit=crop&w=1200&q=80"
                  alt="Bags and accessories"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow-brand mb-4">Our Journey</p>
            <h2 className="heading-brand mb-6 text-3xl sm:text-4xl">
              Fashion made <span className="text-brand-red">simple</span> and stylish
            </h2>

            <p className="mb-5 leading-relaxed text-gray-400">
              Apni Dukan was created with one simple idea: make fashion shopping easier, cleaner,
              and more inspiring. We focus on products that can upgrade your wardrobe without
              making style complicated or overwhelming.
            </p>
            <p className="mb-8 leading-relaxed text-gray-400">
              Whether you are looking for a dress for a special day, a stylish bag for daily use,
              a belt to complete your outfit, or comfortable clothing for your routine — our
              collection is built to help you look and feel your absolute best.
            </p>

            <div className="space-y-3">
              {[
                'Dresses for every occasion — casual, formal, and everything in between',
                'Bags & belts that complement any outfit, any day',
                'Clothing that fits your lifestyle and your budget',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <p className="text-sm text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values / What We Believe ── */}
      <section className="border-y border-brand-gray bg-brand-charcoal/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="eyebrow-brand mb-4">Our Philosophy</p>
            <h2 className="heading-brand text-3xl sm:text-4xl md:text-5xl">
              What We <span className="text-brand-red">Believe</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              Fashion is more than clothes — it is how you express yourself, carry yourself,
              and step into every moment with confidence. That is what drives everything we do.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-brand-gray bg-brand-charcoal p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-[0_0_30px_rgba(204,0,0,0.2)]"
                >
                  <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-red/5 blur-xl transition group-hover:bg-brand-red/10" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 ring-1 ring-brand-red/20 transition group-hover:bg-brand-red/20">
                      <Icon className="h-7 w-7 text-brand-red" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Work (dark feature band) ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-brand-gray bg-gradient-to-br from-brand-charcoal to-brand-black p-8 md:p-12">
          <div className="mb-12 text-center">
            <p className="eyebrow-brand mb-4">Why Shop With Us</p>
            <h2 className="heading-brand text-3xl md:text-4xl">
              The <span className="text-brand-red">Apni Dukan</span> Difference
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col items-start gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 ring-1 ring-brand-red/20">
                    <Icon className="h-7 w-7 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Do It (3 pillars) ── */}
      <section className="border-t border-brand-gray bg-brand-charcoal/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="eyebrow-brand mb-4">Our Approach</p>
            <h2 className="heading-brand text-3xl md:text-4xl">
              How We Bring <span className="text-brand-red">Fashion</span> to You
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((item, i) => (
              <div
                key={item.name}
                className="flex flex-col items-center rounded-3xl border border-brand-gray bg-brand-charcoal p-8 text-center transition-all duration-300 hover:border-brand-red/40"
              >
                <div className="mb-5 text-5xl">{item.emoji}</div>
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-brand-gray px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-charcoal to-brand-red/10" />
        <div className="pointer-events-none absolute -top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-red/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 text-5xl">✨</div>
          <h2 className="heading-brand mb-5 text-3xl sm:text-4xl md:text-5xl">
            Ready to <span className="text-brand-red">refresh</span> your wardrobe?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">
            Discover stylish dresses, clothing, belts, and bags designed for every occasion.
            Join thousands of customers who dress with confidence.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-10 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-brand-neon hover:text-black"
            >
              Start Shopping
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gray px-10 py-4 text-sm font-semibold text-gray-300 transition hover:border-brand-red/50 hover:text-white"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
