import { ProductCarousel } from '@/components/product/ProductCarousel';
import { SectionHeader } from './SectionHeader';
import { OCCASION_EDIT } from '@/data/products';

export function OccasionEdit() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-page">
        <SectionHeader
          eyebrow="The occasion edit"
          title={
            <>
              <span className="italic font-extralight">dressed for</span>{' '}
              <span className="uppercase">summer occasions</span>
            </>
          }
          size="compact"
          cta={{ label: 'Shop the edit', href: '/products/occasion-edit' }}
        />

        <div className="mt-8 lg:mt-10">
          <ProductCarousel products={OCCASION_EDIT} ariaLabel="Occasion edit" priority />
        </div>
      </div>
    </section>
  );
}
