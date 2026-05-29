import { cn } from '@/lib/utils';
import { Inter, Playfair_Display } from 'next/font/google';
import TrustStrip from './TrustStrip';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import SaleBanner from './SaleBanner';
import BrandStrip from './BrandStrip';
import BlogSection from './BlogSection';
import NewsletterSection from './NewsletterSection';
import CategoryProductRow from './CategoryProductRow';
import { Hero } from './Hero';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default async function Home() {
  return (
    <div className={cn(inter.variable, playfair.variable, 'bg-brand-black text-white')}>
      <Hero />
      <TrustStrip />
      <ProductGrid />
      <CategoryGrid />

      <div className="bg-brand-black divide-y divide-neutral-900">
        <CategoryProductRow
          title="For Winter"
          subtitle="Winter collection"
          href="/search?q=winter"
          query="Collections:winter"
          accentColor="text-pink-400"
        />
        <CategoryProductRow
          title="For Summer"
          subtitle="Power collection"
          href="/search?q=summer"
          query="Collections:summer"
          accentColor="text-blue-400"
        />
        
      </div>
      <SaleBanner />
      <BrandStrip />
      <BlogSection />
      <NewsletterSection />
    </div>
  );
}