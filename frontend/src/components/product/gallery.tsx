"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { GridTileImage } from "../grid/tile";
import { useProduct, useUpdateURL } from "./product-context";
import clsx from "clsx";

export default function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "flex h-full items-center justify-center px-5 text-brand-burgundy transition-all duration-300 ease-soft hover:text-brand-clay";

  return (
    <form className="h-full">
      <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
        {images.length > 1 ? (
          <div className="relative order-2 shrink-0 lg:order-1 lg:h-[min(650px,70vh)] lg:w-20">
            <ul className="no-scrollbar flex max-w-full items-center justify-start gap-3 overflow-x-auto py-1 lg:h-full lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto lg:pr-1.5 lg:gallery-thumbs-scroll">
              {images.map((image, index) => {
                const isActive = index === imageIndex;
                return (
                  <li key={image.src} className="h-16 w-16 shrink-0 lg:h-[4.5rem] lg:w-[4.5rem]">
                    <button
                      formAction={() => {
                        const newState = updateImage(index.toString());
                        updateURL(newState);
                      }}
                      aria-label={`View image ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      className="h-full w-full"
                    >
                      <GridTileImage
                        alt={image.altText}
                        src={image.src}
                        active={isActive}
                        width={80}
                        height={80}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <div className="relative order-1 min-w-0 flex-1 lg:order-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-brand-sand lg:aspect-auto lg:h-[min(650px,70vh)]">
            {images[imageIndex] && (
              <Image
                className="h-full w-full object-contain p-6"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={images[imageIndex]?.src as string}
                alt={images[imageIndex]?.altText as string}
                priority={true}
              />
            )}

            {images.length > 1 ? (
              <>
                <div className="absolute inset-y-0 left-0 hidden items-center md:flex">
                  <button
                    formAction={() => {
                      const newState = updateImage(previousImageIndex.toString());
                      updateURL(newState);
                    }}
                    aria-label="Previous product image"
                    className={clsx(
                      buttonClassName,
                      "rounded-r-full bg-brand-oatmilk/80 backdrop-blur-sm"
                    )}
                  >
                    <ArrowLeft className="h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 hidden items-center md:flex">
                  <button
                    formAction={() => {
                      const newState = updateImage(nextImageIndex.toString());
                      updateURL(newState);
                    }}
                    aria-label="Next product image"
                    className={clsx(
                      buttonClassName,
                      "rounded-l-full bg-brand-oatmilk/80 backdrop-blur-sm"
                    )}
                  >
                    <ArrowRight className="h-5" />
                  </button>
                </div>

                <div className="absolute bottom-4 flex w-full justify-center md:hidden">
                  <div className="mx-auto flex h-10 items-center rounded-full border border-brand-clay/25 bg-brand-oatmilk/85 text-brand-burgundy shadow-[0_20px_50px_-35px_rgba(74,21,37,0.55)] backdrop-blur">
                    <button
                      formAction={() => {
                        const newState = updateImage(previousImageIndex.toString());
                        updateURL(newState);
                      }}
                      aria-label="Previous product image"
                      className={buttonClassName}
                    >
                      <ArrowLeft className="h-5" />
                    </button>
                    <div className="mx-1 h-5 w-px bg-brand-clay/30" />
                    <button
                      formAction={() => {
                        const newState = updateImage(nextImageIndex.toString());
                        updateURL(newState);
                      }}
                      aria-label="Next product image"
                      className={buttonClassName}
                    >
                      <ArrowRight className="h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
