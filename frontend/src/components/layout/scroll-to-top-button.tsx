'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-4 z-50 flex h-12 w-12 items-center justify-center',
        'rounded-full bg-brand-burgundy text-brand-oatmilk shadow-lg',
        'transition hover:bg-brand-clay md:hidden',
      )}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
