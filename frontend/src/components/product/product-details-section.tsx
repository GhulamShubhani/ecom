import { Product, ProductMetafield } from "@/lib/shopify/types";
import Prose from "../prose";

type ProductDetailsSectionProps = {
  product: Product;
};

function MetafieldList({ metafields }: { metafields: ProductMetafield[] }) {
  const visible = metafields.filter((field) => field.value?.trim());

  if (!visible.length) return null;

  return (
    <dl className="mt-8 grid gap-4 sm:grid-cols-2">
      {visible.map((field) => (
        <div
          key={`${field.namespace}.${field.key}`}
          className="rounded-2xl border border-brand-clay/15 bg-brand-sand/40 px-4 py-3"
        >
          <dt className="font-jakarta text-[10px] font-semibold tracking-[0.28em] text-brand-burgundy/45 uppercase">
            {field.key.replace(/_/g, " ")}
          </dt>
          <dd className="mt-1 font-jakarta text-sm text-brand-burgundy/80">
            {field.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  if (!product.descriptionHtml && !product.tags.length && !product.metafields.length) {
    return null;
  }  

  return (
    <section
      aria-labelledby="product-details-heading"
      className="mt-10 border-t border-brand-clay/15 pt-10 md:mt-12 md:pt-12"
    >
      <p className="mb-2 font-jakarta text-[11px] font-semibold tracking-[0.4em] text-brand-champagne uppercase">
        Details
      </p>
      <h2
        id="product-details-heading"
        className="font-cormorant mb-6 text-3xl font-medium text-brand-burgundy md:text-4xl"
      >
        Product Description
      </h2>

      {product.descriptionHtml ? (
        <Prose
          className="max-w-none font-jakarta text-sm leading-relaxed text-brand-burgundy/75 prose-headings:font-cormorant prose-headings:font-medium prose-headings:text-brand-burgundy prose-p:text-brand-burgundy/75 prose-strong:text-brand-burgundy prose-a:text-brand-clay prose-a:no-underline hover:prose-a:text-brand-burgundy prose-li:text-brand-burgundy/75 prose-ol:list-decimal prose-ul:list-disc prose-img:rounded-2xl prose-img:border prose-img:border-brand-clay/15"
          html={product.descriptionHtml}
        />
      ) : null}

      {product.tags.length ? (
        <ul className="mt-8 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-brand-clay/20 bg-white/70 px-3 py-1 font-jakarta text-[11px] tracking-wide text-brand-burgundy/60 uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <MetafieldList metafields={product.metafields} />
    </section>
  );
}
