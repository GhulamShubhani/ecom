'use client';

import { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

type Props = {
  title: string;
  className?: string;
};

/**
 * Elegant sticky share rail. Presentational only — builds share links from the
 * current URL on the client and offers a copy-to-clipboard affordance.
 */
export default function ShareButtons({ title, className }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      node: <span className="text-[13px] font-semibold">X</span>,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      node: <span className="text-[13px] font-semibold">f</span>,
    },
    {
      label: 'Share on Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      node: <span className="text-[13px] font-semibold">P</span>,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div
      className={
        'flex items-center gap-3 lg:flex-col ' + (className ?? '')
      }
    >
      <span className="hidden text-[10px] font-semibold tracking-[0.28em] text-brand-burgundy/40 uppercase lg:mb-1 lg:flex lg:items-center lg:gap-2">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </span>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-clay/30 bg-white/70 text-brand-burgundy transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-oatmilk"
        >
          {link.node}
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-clay/30 bg-white/70 text-brand-burgundy transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:border-brand-burgundy hover:bg-brand-burgundy hover:text-brand-oatmilk"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
