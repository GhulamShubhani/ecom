import { getProducts } from '@/lib/shopify';
import { cn } from '@/lib/utils';

const FALLBACK_BRANDS = ['ZARA', 'H&M', 'MANGO', "LEVI'S", 'FOREVER 21', 'GUCCI', 'PRADA', 'FOSSIL', 'NIKE', 'ADIDAS', 'VERSACE', 'TOMMY HILFIGER'];

async function getStoreBrands() {
  try {
    const products = await getProducts({ sortKey: 'BEST_SELLING', reverse: false });
    const uniqueVendors = Array.from(
      new Set(
        products
          .map((product) => product.vendor?.trim())
          .filter((vendor): vendor is string => Boolean(vendor))
      )
    );
    const brands = uniqueVendors.length > 0 ? uniqueVendors.slice(0, 12) : FALLBACK_BRANDS;
    return [...brands, ...brands];
  } catch {
    return [...FALLBACK_BRANDS, ...FALLBACK_BRANDS];
  }
}

export default async function BrandStrip() {
  const items = await getStoreBrands();

  return (
    <section className={cn('overflow-hidden border-y border-brand-gray bg-brand-charcoal py-16')}>
      <p className="mb-8 text-center text-sm tracking-[0.2em] text-gray-400 uppercase">Brands You&apos;ll Love</p>
      <div className="animate-brand-marquee flex w-max items-center">
        {items.map((brand, idx) => (
          <div key={`${brand}-${idx}`} className="flex items-center">
            <p className="px-10 font-heading text-2xl font-bold tracking-[0.2em] text-white/40 uppercase transition hover:text-brand-red">
              {brand}
            </p>
            <span className="text-white/20">|</span>
          </div>
        ))}
      </div>
    </section>
  );
}

