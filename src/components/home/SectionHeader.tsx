import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title?: React.ReactNode;
  cta?: { label: string; href: string };
  align?: 'left' | 'center';
  /** Compact = small title (carousel rails). Editorial = large display title. */
  size?: 'compact' | 'editorial';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  cta,
  align = 'left',
  size = 'compact',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 md:flex-row md:items-end',
        align === 'center' ? 'md:justify-center md:text-center' : 'md:justify-between',
        className,
      )}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        {title && (
          <h2
            className={cn(
              'font-serif font-light text-ink',
              size === 'compact' ? 'text-2xl sm:text-3xl' : 'text-display-md',
            )}
          >
            {title}
          </h2>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="link-underline inline-flex items-center gap-1.5 self-start text-[11px] uppercase tracking-wider2 text-ink md:self-end"
        >
          {cta.label}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
