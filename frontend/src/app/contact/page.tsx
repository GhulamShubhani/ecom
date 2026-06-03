import type { Metadata } from 'next';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Instagram,
  Youtube,
  Music2,
  ChevronRight,
  Zap,
  HeartHandshake,
} from 'lucide-react';
import { BRAND } from '@/constants/brand';
import { getShopContact } from '@/lib/shopify';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Apni Dukan',
  description:
    'Have a question about your order, need styling advice, or want to collaborate? Reach the Apni Dukan team — friendly, fast, and always here to help.',
};

export const dynamic = 'force-dynamic';

const badges = [
  { icon: Zap, label: 'Quick Response' },
  { icon: HeartHandshake, label: 'Friendly Support' },
  { icon: ShieldCheck, label: '100% Private' },
];

const socials = [
  { icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  { icon: Music2, href: BRAND.social.tiktok, label: 'TikTok' },
];

const faqs = [
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3–7 business days. Express options are available at checkout.',
  },
  {
    question: 'Can I return or exchange an item?',
    answer: 'Yes! We offer easy returns and exchanges within 30 days of purchase on eligible items.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive a tracking link via email to follow your delivery.',
  },
];

export default async function ContactPage() {
  const contact = await getShopContact({
    name: BRAND.name,
    email: BRAND.email,
    phone: BRAND.phone,
    address: BRAND.address,
    hours: 'Mon–Sat · 10:00 AM – 6:00 PM',
  });

  const details = [
    { icon: Mail, label: 'Email Us', value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: Phone,
      label: 'Call Us',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, '')}`,
    },
    { icon: MapPin, label: 'Location', value: contact.address },
    { icon: Clock, label: 'Working Hours', value: contact.hours },
  ];

  return (
    <main className="min-h-screen bg-brand-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-gray">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal via-brand-black to-brand-red/10" />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-red/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-red/8 blur-[120px]" />

        {/* Decorative fashion icons */}
        <div className="pointer-events-none absolute top-10 left-8 text-6xl opacity-5 select-none">👗</div>
        <div className="pointer-events-none absolute top-16 right-12 text-5xl opacity-5 select-none">👜</div>
        <div className="pointer-events-none absolute bottom-8 left-1/4 text-4xl opacity-5 select-none">✨</div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-32">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
            <MessageCircle className="h-3.5 w-3.5" />
            We&apos;d Love to Hear From You
          </span>

          <h1 className="heading-brand mx-auto mb-6 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            Get in <span className="text-brand-red">Touch</span> With Us
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            Have a question about an order, need styling advice, or want to partner with us?
            Our team is always happy to help — quickly and with a smile.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brand-gray bg-brand-charcoal/70 px-5 py-2.5 text-sm font-medium text-gray-200 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-brand-red" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">

          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-8">

            {/* Heading */}
            <div>
              <p className="eyebrow-brand mb-3">Reach Us Directly</p>
              <h2 className="heading-brand mb-4 text-3xl">We&apos;re Here for You</h2>
              <p className="leading-relaxed text-gray-400">
                Whether you need help with an order, have a product question, or just want to say
                hello — our team is here. We typically reply within 24 hours.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              {details.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="card-brand group flex items-center gap-4 p-4 hover:border-brand-red/50 transition-all duration-300">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 ring-1 ring-brand-red/20 transition group-hover:bg-brand-red/20">
                      <Icon className="h-5 w-5 text-brand-red" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="truncate text-sm font-medium text-gray-100">{item.value}</p>
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

            {/* Social Links */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.15em] text-gray-500">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gray bg-brand-charcoal text-gray-400 transition hover:border-brand-red/50 hover:bg-brand-red/10 hover:text-brand-red"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-2 rounded-2xl border border-brand-gray bg-brand-charcoal/50 px-4 py-3 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-brand-red shrink-0" />
              Your message is completely private. We never share your information.
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-brand-gray bg-brand-charcoal/30 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="eyebrow-brand mb-3">Quick Answers</p>
            <h2 className="heading-brand text-3xl md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-400">
              Find quick answers to common questions below. For anything else, use the form above.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="card-brand rounded-2xl p-6 hover:border-brand-red/40 transition-all duration-300"
              >
                <h3 className="mb-3 text-base font-semibold text-white">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
