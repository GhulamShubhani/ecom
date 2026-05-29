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
    <section className={cn('bg-brand-charcoal py-20')}>
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="mb-3 text-xs tracking-[0.25em] text-brand-red uppercase">VIP ACCESS</p>
        <h2 className="font-heading mb-4 text-4xl text-white md:text-5xl">Get 15% Off Your First Order</h2>
        <p className="mb-8 text-sm text-gray-400">
          Join our list for exclusive deals, early access & discreet updates. Unsubscribe anytime.
        </p>

        {!submitted ? (
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mb-3 w-full rounded-full border border-brand-gray bg-brand-black px-5 py-3 text-white placeholder:text-gray-500 transition focus:border-brand-red focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full rounded-full bg-brand-red px-6 py-3 font-semibold tracking-wide text-white transition-all duration-300 hover:bg-brand-neon"
            >
              Subscribe & Get 15% Off
            </button>
            {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
          </div>
        ) : (
          <p className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-green-400">
            ✅ You&apos;re in! Check your inbox for your 15% off code.
          </p>
        )}

        <p className="mt-6 inline-flex items-center gap-2 text-xs text-gray-600">
          <Lock className="h-3.5 w-3.5" />
          We never share your data. Discreet emails only.
        </p>
      </div>
    </section>
  );
}

