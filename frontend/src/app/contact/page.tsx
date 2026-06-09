import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  Truck,
  ShieldCheck,
  MessageCircle,
  Instagram,
  Youtube,
  Music2,
  ChevronRight,
} from 'lucide-react';
import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';
import { getShopContact } from '@/lib/shopify';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: `Contact Us | ${BRAND.name}`,
  description:
    `Questions about orders, sizing or delivery? Reach the ${BRAND.name} team — friendly support, always.`,
};

export const dynamic = 'force-dynamic';

const badges = [
  { icon: Truck, label: 'Pan-India Delivery' },
  { icon: ShieldCheck, label: 'Easy Returns' },
  { icon: Lock, label: 'Secure Checkout' },
];

const socials = [
  { icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  { icon: Music2, href: BRAND.social.tiktok, label: 'TikTok' },
];

export default async function ContactPage() {
  const contact = await getShopContact();

  const details = [
    { icon: Mail, label: 'Email', value: contact.email || BRAND.email, href: `mailto:${contact.email || BRAND.email}` },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone || BRAND.phone,
      href: `tel:${(contact.phone || BRAND.phone).replace(/\s+/g, '')}`,
    },
    { icon: MapPin, label: 'Location', value: contact.address || BRAND.address },
    { icon: Clock, label: 'Hours', value: contact.hours || 'Mon–Sat, 10am – 7pm IST' },
  ];

  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      {/* Hero */}
      <section className="relative min-h-[460px] border-b border-brand-clay/15">
        <Image
          src={IMAGES.pages.contact}
          alt="Contact Apni Dukan customer support"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-brand-night/80 via-brand-burgundy/60 to-brand-burgundy/50" />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-clay/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-oatmilk/30 bg-brand-night/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-oatmilk backdrop-blur-sm">
            <MessageCircle className="h-3.5 w-3.5" />
            Contact Us
          </span>
          <h1 className="heading-brand mx-auto mb-6 max-w-4xl text-5xl leading-[1.08] text-brand-oatmilk md:text-7xl">
            We&apos;re here to <span className="text-brand-clay italic">help</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-brand-oatmilk/80">
            Order questions, sizing help or delivery updates — the {BRAND.name} team responds
            quickly and clearly, usually within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brand-oatmilk/25 bg-brand-night/25 px-4 py-2 text-xs text-brand-oatmilk/90 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-brand-champagne" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Info panel */}
          <div className="lg:col-span-2">
            <p className="eyebrow-brand mb-3">Reach us directly</p>
            <h2 className="heading-brand mb-4 text-4xl text-brand-burgundy">Get in touch</h2>
            <p className="mb-8 max-w-md leading-relaxed text-brand-burgundy/65">
              Write to us for product advice, order support, returns or wholesale enquiries.
              Our support team is based in India and ready to assist you.
            </p>

            <div className="space-y-3">
              {details.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="card-brand group flex items-center gap-4 p-4 hover:border-brand-clay/50">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-clay/10 ring-1 ring-brand-clay/20 transition group-hover:bg-brand-clay/20">
                      <Icon className="h-5 w-5 text-brand-clay" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-brand-burgundy/45">
                        {item.label}
                      </p>
                      <p className="truncate text-sm text-brand-burgundy">{item.value}</p>
                    </div>
                    {item.href ? (
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-brand-burgundy/30 transition group-hover:translate-x-0.5 group-hover:text-brand-clay" />
                    ) : null}
                  </div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-clay/25 bg-white text-brand-burgundy/55 transition hover:border-brand-clay hover:text-brand-clay"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-brand-burgundy/45">
              <Lock className="h-3.5 w-3.5 text-brand-clay" />
              All messages are private. Friendly support, always.
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
