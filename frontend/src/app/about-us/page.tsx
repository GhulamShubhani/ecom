import {
  HeartHandshake,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Award,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

export const metadata: Metadata = {
  title: `About Us | ${BRAND.name}`,
  description:
    `${BRAND.name} is your trusted online fashion destination — quality clothing, honest pricing, and styles for every occasion.`,
};

const values = [
  {
    icon: Sparkles,
    title: 'Quality you can trust',
    description:
      'Every product is selected for fabric, fit and value — no compromises on what you wear every day.',
  },
  {
    icon: Ruler,
    title: 'Honest sizing & details',
    description:
      'Clear product information and size guidance so you know exactly what you are ordering.',
  },
  {
    icon: HeartHandshake,
    title: 'Fashion for everyone',
    description:
      'Women, men and every occasion — Apni Dukan brings styles that work for real life.',
  },
];

const features = [
  {
    icon: Truck,
    title: 'Fast Pan-India Delivery',
    description: 'Reliable shipping across India with order tracking on every purchase.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Pay safely with UPI, cards, net banking or cash on delivery.',
  },
  {
    icon: Award,
    title: 'Curated Collections',
    description: 'Hand-picked edits across clothing, footwear, accessories and more.',
  },
];

const stats = [
  { value: '10k+', label: 'Happy customers' },
  { value: '900+', label: 'Products' },
  { value: '4.8★', label: 'Average rating' },
  { value: '7-day', label: 'Easy returns' },
];

export default function AboutUsPage() {
  return (
    <main className="bg-brand-oatmilk text-brand-burgundy">
      {/* Hero */}
      <section className="relative min-h-[480px] border-b border-brand-clay/15">
        <Image
          src={IMAGES.pages.about}
          alt="Apni Dukan fashion boutique"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-night/90 via-brand-burgundy/75 to-brand-burgundy/40" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-brand mb-4 text-brand-champagne">Our Story</p>
            <h1 className="heading-brand mb-6 text-5xl leading-[1.05] text-brand-oatmilk md:text-7xl">
              Your shop for everyday style.
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-brand-oatmilk/80">
              {BRAND.name} started with a simple idea: everyone deserves access to good fashion
              without the hassle. From casual wear to occasion dressing, we bring together
              trusted brands and fresh styles in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/search" className="btn-brand">
                Shop Now →
              </Link>
              <Link href="/contact" className="btn-brand-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-brand-clay/15 bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="heading-brand text-4xl text-brand-burgundy md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wider2 text-brand-burgundy/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow-brand mb-3">Why we exist</p>
            <h2 className="heading-brand mb-6 text-3xl text-brand-burgundy md:text-4xl">
              Shopping made simple.
            </h2>
            <p className="mb-4 leading-relaxed text-brand-burgundy/65">
              We built {BRAND.name} because finding the right clothes online should not be
              confusing or disappointing. Whether you are updating your wardrobe or shopping for
              a special occasion, we want the experience to feel easy from start to finish.
            </p>
            <p className="leading-relaxed text-brand-burgundy/65">
              Our team works with trusted suppliers to offer clothing, footwear and accessories
              at fair prices — with reliable delivery and friendly support when you need help.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-brand p-6 hover:border-brand-clay/50">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-clay/10">
                    <Icon className="h-5 w-5 text-brand-clay" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-brand-burgundy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-burgundy/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promise / features */}
      <section className="bg-brand-sand/70 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="eyebrow-brand mb-3">The {BRAND.name} Promise</p>
            <h2 className="heading-brand text-3xl text-brand-burgundy md:text-4xl">What you can always count on</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-brand p-8 hover:border-brand-clay/50">
                  <Icon className="mb-5 h-8 w-8 text-brand-clay" />
                  <h3 className="mb-3 text-xl font-semibold text-brand-burgundy">{item.title}</h3>
                  <p className="text-sm leading-6 text-brand-burgundy/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-burgundy via-[#2a0f16] to-brand-night px-6 py-20 text-center">
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="heading-brand mb-4 text-4xl text-brand-oatmilk md:text-5xl">Ready to shop?</h2>
          <p className="mb-8 text-lg text-brand-oatmilk/70">
            Explore women&apos;s and men&apos;s fashion, dresses, footwear and accessories — all in one place.
          </p>
          <Link href="/search" className="btn-brand-outline">
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
