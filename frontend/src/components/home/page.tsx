import { AUDIENCE_COLLECTIONS } from '@/constants/audience-collections';
import HeroSection from './HeroSection';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import PromoSplitBanner from './PromoSplitBanner';
import ImageOverlayBanner from './ImageOverlayBanner';
import SaleBanner from './SaleBanner';
import BrandStrip from './BrandStrip';
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
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.forCouples} />
      </div>
      <ImageOverlayBanner />
      <div className="bg-brand-oatmilk">
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.forHer} />
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.forHim} />
        <CategoryProductRow {...AUDIENCE_COLLECTIONS.forKink} />
      </div>
      <SaleBanner />
      <BrandStrip />
      <NewsletterSection />
    </div>
  );
}