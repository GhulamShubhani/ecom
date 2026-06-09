'use client';

import { cn } from '@/lib/utils';

const tickerText =
  '🚚 Free Shipping Over $99  •  ✨ New SS26 Arrivals  •  ✅ 100-Day Price Match  •  ↩️ Easy 30-Day Returns  •  💳 Card, PayPal & BNPL  •';

export default function AnnouncementBar() {
  return (
    <div className={cn('sticky top-0 z-50 h-9 overflow-hidden bg-brand-red')}>
      <div className="animate-marquee flex h-full min-w-max items-center">
        <p className="px-6 text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap text-white">
          {tickerText}
        </p>
        <p className="px-6 text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap text-white">
          {tickerText}
        </p>
      </div>
    </div>
  );
}

