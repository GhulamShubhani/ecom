import { BrandLogo } from '@/components/brand/brand-logo';
import { cn } from '@/lib/utils';

export default function LogoIcon({ className }: { className?: string }) {
  return <BrandLogo className={cn('text-brand-champagne', className)} />;
}
