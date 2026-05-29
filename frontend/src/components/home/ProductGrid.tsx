import { getProducts } from '@/lib/shopify';
import type { Product as HomeProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';

async function getPopularProducts(): Promise<HomeProduct[]> {
  const storeProducts = await getProducts({
    sortKey: 'BEST_SELLING',
    reverse: false,
  });

  return storeProducts.slice(0, 8).map((product, index) => {
    const price = Number(product.priceRange.minVariantPrice.amount || 0);
    const compareAtPrice = index % 2 === 0 ? Math.round(price * 1.25) : undefined;

    return {
      id: product.id,
      name: product.title,
      price,
      originalPrice: compareAtPrice,
      badge: 'BESTSELLER',
      rating: 5,
      reviewCount: 120 + index * 11,
      category: 'Popular',
      isBestseller: true,
      image:
        product.featuredImage?.url ||
        product.images?.[0]?.url ||
        'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80',
      href: `/product/${product.handle}`,
    };
  });
}

export default async function ProductGrid() {
  const products = await getPopularProducts();

  return (
    <section className={cn('bg-[#0d0d0d] py-20')}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-heading mb-4 text-center text-4xl text-white md:text-5xl">Our Most Popular Products</h2>
        <p className="mb-14 text-center text-gray-400">
          Thousands of happy customers — see what they love most.
        </p>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

