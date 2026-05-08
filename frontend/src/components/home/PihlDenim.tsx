import Image from 'next/image';
import Link from 'next/link';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { DENIM_FAVOURITES, EDITORIAL_IMAGES } from '@/data/products';

export function PihlDenim() {
  return (
    <section className="bg-sand-50 py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="relative w-full overflow-hidden">
          <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[16/7]">
            <Image
              src={EDITORIAL_IMAGES.pihlDenim}
              alt="Pihl Denim SS26 editorial"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream-50">
              <p className="text-[11px] uppercase tracking-widest2 opacity-80">pihl denim</p>
              <h2 className="mt-3 max-w-3xl font-serif text-2xl font-light leading-tight text-balance sm:text-3xl lg:text-4xl">
                <span className="italic font-extralight">It is all about</span>{' '}
                <span className="block uppercase">comfort, quality, and</span>
                <span className="block uppercase">making you feel great.</span>
              </h2>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/products/ss-denim"
                  className="btn-pill border-cream-50/80 text-cream-50 hover:bg-cream-50 hover:text-ink"
                >
                  Discover new denim
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Spring summer 2026</p>
            <h3 className="mt-2 font-serif text-2xl font-light text-ink sm:text-3xl">
              Your new <span className="italic font-extralight">denim favourites</span>
            </h3>
          </div>
          <Link
            href="/pihl-denim"
            className="link-underline self-start text-[11px] uppercase tracking-wider2 lg:self-end"
          >
            Shop all denim
          </Link>
        </div>

        <div className="mt-8 lg:mt-10">
          <ProductCarousel products={DENIM_FAVOURITES} ariaLabel="Denim favourites" />
        </div>
      </div>
    </section>
  );
}
