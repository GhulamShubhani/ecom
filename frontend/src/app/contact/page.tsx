import type { Metadata } from 'next';
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
import { getShopContact } from '@/lib/shopify';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | PLAY ME',
  description:
    'Questions about products, orders or partnerships? Reach the PLAY ME team — discreet, fast and always judgement-free.',
};

// Contact details are fetched live from Shopify on each request.
export const dynamic = 'force-dynamic';

const badges = [
  { icon: Lock, label: '100% Discreet' },
  { icon: Truck, label: 'Fast Shipping' },
  { icon: ShieldCheck, label: 'Body-Safe' },
];

const socials = [
  { icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  { icon: Music2, href: BRAND.social.tiktok, label: 'TikTok' },
];

export default async function ContactPage() {
  const contact = await getShopContact({
    name: BRAND.name,
    email: BRAND.email,
    phone: BRAND.phone,
    address: BRAND.address,
    hours: 'Mon–Fri · 09:00–18:00 CET',
  });

  const details = [
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    },
    { icon: MapPin, label: 'Studio', value: contact.address },
    { icon: Clock, label: 'Hours', value: contact.hours },
  ];

  return (
    <main className="min-h-screen bg-brand-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-gray bg-gradient-to-br from-brand-charcoal via-brand-black to-brand-red/20">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-red/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-brand-neon/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            <MessageCircle className="h-3.5 w-3.5" />
            Contact Us
          </span>
          <h1 className="heading-brand mx-auto mb-6 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Let&apos;s get in <span className="text-brand-red">touch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            Questions about products, orders or partnerships? Our team is here to help —
            discreetly, quickly and without judgement.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brand-gray bg-brand-charcoal/60 px-4 py-2 text-xs text-gray-300"
              >
                <Icon className="h-3.5 w-3.5 text-brand-red" />
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
            <h2 className="heading-brand mb-4 text-3xl">Get in touch</h2>
            <p className="mb-8 max-w-md leading-relaxed text-gray-400">
              Reach out for anything — product advice, order support or collaborations.
              We typically reply within 24 hours.
            </p>

            <div className="space-y-3">
              {details.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="card-brand group flex items-center gap-4 p-4 hover:border-brand-red/50">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/20 transition group-hover:bg-brand-red/20">
                      <Icon className="h-5 w-5 text-brand-red" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                        {item.label}
                      </p>
                      <p className="truncate text-sm text-gray-100">{item.value}</p>
                    </div>
                    {item.href ? (
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-brand-red" />
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

            {/* Social + privacy note */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray bg-brand-charcoal text-gray-400 transition hover:border-brand-red/50 hover:text-brand-red"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500">
              <Lock className="h-3.5 w-3.5" />
              All messages are private. Discreet support, always.
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
