'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const emailSchema = z.string().email('Please enter a valid email');

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const validated = emailSchema.safeParse(email);
    if (!validated.success) {
      setError(validated.error.issues[0]?.message ?? 'Please enter a valid email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className={cn('bg-brand-oatmilk py-24')}>
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brand-clay/15 bg-brand-sand/70 px-6 py-14 text-center shadow-[0_35px_90px_-65px_rgba(74,21,37,0.55)] sm:px-12">
        <p className="mb-4 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">Style Notes</p>
        <h2 className="font-cormorant mb-5 text-5xl leading-tight font-medium text-brand-burgundy md:text-6xl">Receive 15% off your first order</h2>
        <p className="mx-auto mb-9 max-w-xl font-jakarta text-sm leading-relaxed text-brand-burgundy/60">
          Join our list for styling tips, lookbook previews, early access to new arrivals and exclusive offers.
        </p>

        {!submitted ? (
          <div className="mx-auto max-w-xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-brand mb-3"
            />
            <button
              onClick={handleSubmit}
              className="btn-brand w-full"
            >
              Subscribe & Receive 15% Off
            </button>
            {error ? <p className="mt-3 font-jakarta text-sm text-brand-burgundy">{error}</p> : null}
          </div>
        ) : (
          <p className="rounded-2xl border border-brand-sage/40 bg-brand-sage/10 p-5 font-jakarta text-brand-burgundy">
            You&apos;re in. Check your inbox for your 15% off code.
          </p>
        )}

        <p className="mt-7 inline-flex items-center gap-2 font-jakarta text-xs text-brand-burgundy/45">
          <Lock className="h-3.5 w-3.5 text-brand-clay" />
          We never share your data. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

