'use client';

import { cn } from '@/lib/utils';

const tickerText =
  'FREE SHIPPING OVER $99  •  NEW SS26 ARRIVALS  •  100-DAY PRICE MATCH  •  EASY 30-DAY RETURNS  •  SECURE CARD, PAYPAL & BNPL  •';

export default function AnnouncementBar() {
  return (
    <div className={cn('sticky top-0 z-50 h-9 overflow-hidden bg-brand-burgundy')}>
      <div className="animate-marquee flex h-full min-w-max items-center">
        <p className="px-8 font-jakarta text-[11px] font-medium uppercase tracking-[0.28em] whitespace-nowrap text-brand-oatmilk/90">
          {tickerText}
        </p>
        <p className="px-8 font-jakarta text-[11px] font-medium uppercase tracking-[0.28em] whitespace-nowrap text-brand-oatmilk/90">
          {tickerText}
        </p>
      </div>
    </div>
  );
}

