import Image from 'next/image';
import Link from 'next/link';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { EDITORIAL_IMAGES, FAVOURITES } from '@/data/products';

export function FroyaJuliana() {
  return (
    <section className="bg-cream-100 py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Editorial image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-5">
            <Image
              src={EDITORIAL_IMAGES.froyaJuliana}
              alt="Frøya & Juliana editorial"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Copy */}
          <div className="flex flex-col lg:col-span-7">
            <p className="eyebrow">Edit · SS26</p>
            <h2 className="mt-2 font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              <span className="italic font-extralight">inspired by</span>{' '}
              <span className="block sm:inline">Frøya &amp; Juliana.</span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base italic text-ink-soft sm:text-lg">
              Their favourite pieces for the season — soft tailoring, hand-finished details and
              colours pulled from the fjords.
            </p>

            <div className="mt-6">
              <Link href="/products/froya-juliana-favourites" className="btn-pill">
                Shop their favourite pieces
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <ProductCarousel products={FAVOURITES} ariaLabel="Frøya & Juliana favourites" />
        </div>
      </div>
    </section>
  );
}
