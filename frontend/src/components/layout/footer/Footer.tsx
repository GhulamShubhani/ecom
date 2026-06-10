import Link from 'next/link';
import { Instagram, MessageCircle, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const helpLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Info', href: '/contact' },
  { label: 'Returns & Refunds', href: '/contact' },
  { label: 'FAQ', href: '/contact' },
  { label: 'Track Order', href: '/contact' },
];

const shopLinks = [
  { label: 'Dresses', href: '/collections/dresses' },
  { label: 'Clothing', href: '/search?q=clothing' },
  { label: 'Belts', href: '/search?q=belts' },
  { label: 'Bags', href: '/search?q=bags' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Sale', href: '/search?q=sale' },
  { label: 'All Products', href: '/search' },
];

const companyLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

const payments = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'BNPL'];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: Youtube,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919999999999',
    icon: MessageCircle,
  },
];

export function Footer() {
  return (
    <footer className={cn('border-t-2 border-brand-red/40 bg-[#0d0d0d] pt-16 pb-8')}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href="/" className="font-heading mb-3 block text-2xl text-white">
              APNI DUKAN
            </Link>

            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              Premium fashion essentials designed for style, comfort, and everyday confidence.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-charcoal text-gray-400 transition hover:bg-brand-red/10 hover:text-brand-red"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Help
            </p>

            {helpLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Shop
            </p>

            {shopLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">
              Company
            </p>

            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-gray pt-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            {payments.map((payment) => (
              <span
                key={payment}
                className="rounded-full bg-brand-charcoal px-3 py-1 text-xs text-gray-400"
              >
                {payment}
              </span>
            ))}
          </div>

          <p className="text-center text-xs text-gray-600">
            © 2025 APNI DUKAN. All rights reserved. Designed for style, comfort, and everyday confidence.
          </p>
        </div>
      </div>
    </footer>
  );
}