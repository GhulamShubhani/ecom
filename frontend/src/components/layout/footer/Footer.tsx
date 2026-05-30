import Link from 'next/link';
import { Instagram, MessageCircle, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const helpLinks = ['Contact Us', 'Discreet Delivery', 'Returns & Refunds', 'FAQ', 'Track Order'];
const shopLinks = ['For Winter', 'For Summer', 'For Kids', 'New Arrivals', 'Sale', 'All Products'];
const companyLinks = ['About Us', 'Blog', 'Press', 'Privacy Policy', 'Terms & Conditions', 'Cookie Policy'];
const payments = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'BNPL'];

export function Footer() {
  return (
    <footer className={cn('border-t-2 border-brand-red/40 bg-[#0d0d0d] pt-16 pb-8')}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading mb-3 text-2xl text-white">APNA DUKAN</p>
            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              Premium fashion essentials designed for style, comfort, and everyday confidence.
            </p>
            <div className="flex gap-2">
              {[Instagram, Youtube, MessageCircle].map((Icon, idx) => (
                <button
                  key={`social-${idx}`}
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-charcoal text-gray-400 transition hover:bg-brand-red/10 hover:text-brand-red"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Help</p>
            {helpLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Shop</p>
            {shopLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Company</p>
            {companyLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-gray pt-8 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {payments.map((payment) => (
              <span key={payment} className="rounded-full bg-brand-charcoal px-3 py-1 text-xs text-gray-400">
                {payment}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600">
            © 2025 APNADUKAN. All rights reserved. Designed for style, comfort, and everyday confidence.
          </p>
        </div>
      </div>
    </footer>
  );
}