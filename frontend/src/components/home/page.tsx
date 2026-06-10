import { AUDIENCE_COLLECTIONS } from '@/constants/audience-collections';
import HeroSection from './HeroSection';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import PromoSplitBanner from './PromoSplitBanner';
import ImageOverlayBanner from './ImageOverlayBanner';
import SaleBanner from './SaleBanner';
import BrandStrip from './BrandStrip';
import BlogSection from './BlogSection';
import NewsletterSection from './NewsletterSection';
import CategoryProductRow from './CategoryProductRow';

export default async function Home() {
  return (
    <div className="bg-brand-oatmilk text-brand-night">
      <HeroSection />
      <ProductGrid />
      {/* <TrustStrip /> */}
      {/* <CategoryGrid /> */}
      <PromoSplitBanner />
      <div className="bg-brand-oatmilk">
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.dresses} />
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.newArrivals} />
      </div>
      <ImageOverlayBanner />
      <div className="bg-brand-oatmilk">
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.heroCouples} />
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.heroHer} />
      </div>
      <SaleBanner />
      <div className="bg-brand-oatmilk">
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.heroHim} />
      </div>
      <BlogSection />
      <BrandStrip />
      <NewsletterSection />
    </div>
  );
}