import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-gray bg-brand-charcoal transition-all duration-300 hover:border-brand-red/50 hover:shadow-[0_0_20px_rgba(204,0,0,0.35)]">
      <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900">
        <Image src={product.image} alt={product.name} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
        <span className="absolute top-3 left-3 rounded-full bg-brand-red px-2 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
          {product.badge}
        </span>
        <button aria-label="Add to wishlist" className="absolute top-3 right-3 text-gray-500 transition hover:text-brand-red">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-sm leading-snug font-medium text-white">{product.name}</h3>
        <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star key={`${product.id}-star-${idx}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand-red">{formatCurrency(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
          ) : null}
        </div>
        <Link
          href={product.href}
          className={cn(
            'mt-3 block w-full rounded-lg border border-brand-red/40 py-2 text-center text-sm text-brand-red transition-all duration-300',
            'group-hover:bg-brand-red group-hover:text-white'
          )}
        >
          Add to Cart
        </Link>
      </div>
    </article>
  );
}

