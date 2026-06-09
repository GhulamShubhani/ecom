import { cn } from '@/lib/utils';

type BrandWordmarkProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
};

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-[2rem] lg:text-4xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export function BrandWordmark({
  className,
  size = 'md',
  onDark = false,
}: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        'font-cormorant leading-none font-light tracking-tight',
        onDark ? 'text-brand-oatmilk' : 'text-brand-burgundy',
        sizeClasses[size],
        className
      )}
    >
      Apni{' '}
      <span className="ml-0.5 italic font-normal text-brand-clay">Dukan</span>
    </span>
  );
}
