import Image from 'next/image';
import Link from 'next/link';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { EDITORIAL_IMAGES, MAY_17_LOOKS } from '@/data/products';

export function May17Outfits() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="order-2 flex flex-col lg:order-1 lg:col-span-7">
            <p className="eyebrow">Outfits for May 17th</p>
            <h2 className="mt-2 font-serif text-3xl font-light leading-tight text-ink sm:text-4xl">
              <span className="italic font-extralight">Elevate</span>{' '}
              <span className="block sm:inline">your look.</span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-base italic text-ink-soft sm:text-lg">
              Refined silhouettes for the national day — from poetic dresses to softly tailored
              blouses and skirts.
            </p>
            <div className="mt-6">
              <Link href="/products/may-17" className="btn-pill">
                Discover the looks
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden lg:order-2 lg:col-span-5">
            <Image
              src={EDITORIAL_IMAGES.may17}
              alt="May 17th outfits editorial"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-10 lg:mt-14">
          <ProductCarousel products={MAY_17_LOOKS} ariaLabel="May 17th outfits" />
        </div>
      </div>
    </section>
  );
}
