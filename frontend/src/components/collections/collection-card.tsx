import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";

export function getCollectionImage(collection: Pick<Collection, "image" | "title">) {
  return {
    src: collection.image?.url ?? null,
    alt: collection.image?.altText || collection.title,
  };
}

export function formatProductCount(count: number) {
  return `${count.toLocaleString()} ${count === 1 ? "Product" : "Products"}`;
}

export default function CollectionCard({
  collection,
  index,
  featured = false,
}: {
  collection: Collection;
  index: number;
  featured?: boolean;
}) {
  const image = getCollectionImage(collection);

  return (
    <Link
      href={collection.path}
      className={cn(
        "group hover-lift relative min-h-88 overflow-hidden rounded-3xl border border-brand-clay/15 bg-brand-night shadow-[0_30px_80px_-52px_rgba(74,21,37,0.55)]",
        featured && "lg:col-span-2"
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          className="object-cover opacity-85 transition-transform duration-500 ease-soft group-hover:scale-105"
          priority={index < 4}
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-brand-night via-brand-night/45 to-transparent" />
      <div className="absolute inset-x-6 top-6 h-px bg-brand-oatmilk/30 transition-opacity group-hover:opacity-70" />
      <div className="relative flex h-full min-h-88 flex-col justify-end p-7 md:p-8">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.34em] text-brand-champagne uppercase">
          {formatProductCount(collection.productCount)}
        </p>
        <h3 className="font-cormorant text-4xl font-medium text-brand-oatmilk transition-colors group-hover:text-brand-clay">
          {collection.title}
        </h3>
        {collection.description ? (
          <p className="mt-3 line-clamp-2 max-w-md font-jakarta text-sm leading-relaxed text-brand-oatmilk/70">
            {collection.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
