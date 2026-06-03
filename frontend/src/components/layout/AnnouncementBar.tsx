'use client';

import { cn } from '@/lib/utils';

const tickerText =
  '🚚 Free Shipping on Orders Over $99  •  🔥 New Arrivals Every Week  •  ✅ Easy Returns & Exchanges  •  👗 Dresses, Clothing, Belts & Bags  •  💳 Card, PayPal & BNPL Accepted  •  🎁 Get 15% Off Your First Order  •';

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

