import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BRAND } from '@/constants/brand';
import { BrandLogo } from './brand-logo';
import { BrandWordmark } from './brand-wordmark';

type BrandLockupProps = {
  className?: string;
  logoClassName?: string;
  wordmarkSize?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  showTagline?: boolean;
  href?: string;
};

export function BrandLockup({
  className,
  logoClassName,
  wordmarkSize = 'md',
  onDark = false,
  showTagline = false,
  href = '/',
}: BrandLockupProps) {
  const content = (
    <div className={cn('inline-flex flex-col items-start gap-3', className)}>
      <BrandLogo
        className={cn(
          'h-12 w-12 shrink-0 transition-colors duration-300',
          onDark ? 'text-brand-champagne' : 'text-brand-champagne',
          logoClassName
        )}
      />
      <BrandWordmark size={wordmarkSize} onDark={onDark} />
      {showTagline ? (
        <p
          className={cn(
            'font-jakarta text-[11px] font-semibold tracking-[0.32em] uppercase',
            onDark ? 'text-brand-champagne/70' : 'text-brand-burgundy/50'
          )}
        >
          {BRAND.tagline}
        </p>
      ) : null}
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="group transition-opacity duration-300 hover:opacity-90"
      aria-label={`${BRAND.name} home`}
    >
      {content}
    </Link>
  );
}
