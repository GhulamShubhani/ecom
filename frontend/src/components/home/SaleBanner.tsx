'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function getNextSundayEnd(): Date {
  const now = new Date();
  const target = new Date(now);
  const currentDay = now.getDay();
  const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(23, 59, 59, 999);
  return target;
}

function buildTimeLeft(targetDate: Date): TimeLeft {
  const distance = targetDate.getTime() - Date.now();
  if (distance <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

// Reusable countdown box to avoid repetition
function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[70px] rounded-2xl border border-brand-champagne/25 bg-brand-oatmilk/10 px-5 py-3 text-center backdrop-blur">
      <p className="font-cormorant text-4xl font-medium tabular-nums text-brand-oatmilk">{value}</p>
      <p className="mt-1 font-jakarta text-[10px] font-semibold tracking-[0.28em] text-brand-champagne uppercase">{label}</p>
    </div>
  );
}

const LABELS = ['DD', 'HH', 'MM', 'SS'] as const;

export default function SaleBanner() {
  // ✅ null on first render — avoids hydration mismatch
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // ✅ Only runs on client — safe from hydration issues
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const target = getNextSundayEnd();
      setTargetDate(target);
      setTimeLeft(buildTimeLeft(target));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const next = buildTimeLeft(targetDate);
      // When countdown reaches zero, roll to next Sunday
      if (
        next.days === '00' &&
        next.hours === '00' &&
        next.minutes === '00' &&
        next.seconds === '00'
      ) {
        const newTarget = getNextSundayEnd();
        setTargetDate(newTarget);
        setTimeLeft(buildTimeLeft(newTarget));
        return;
      }
      setTimeLeft(next);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand-burgundy via-[#2a0f16] to-brand-night px-6 py-20 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(211,179,143,0.16)_0%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-4 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
          Limited Campaign
        </p>
        <h2 className="font-cormorant mb-5 text-5xl leading-tight font-medium text-brand-oatmilk md:text-7xl">
          The Season Edit — Up to 40% Off
        </h2>
        <p className="mb-9 font-jakarta text-lg text-brand-oatmilk/70">
          No code needed. Discount applied at checkout. Ends Sunday.
        </p>

        {/* Countdown — shows dashes on server, real values after mount */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {timeLeft === null
            ? LABELS.map((label) => (
                <TimeBox key={label} value="--" label={label} />
              ))
            : (
                <>
                  <TimeBox value={timeLeft.days}    label="DD" />
                  <TimeBox value={timeLeft.hours}   label="HH" />
                  <TimeBox value={timeLeft.minutes} label="MM" />
                  <TimeBox value={timeLeft.seconds} label="SS" />
                </>
              )}
        </div>

        <Link
          href="/search?sort=trending-desc"
          className={cn('btn-brand-outline')}
        >
          Shop the Campaign
        </Link>
      </div>
    </section>
  );
}