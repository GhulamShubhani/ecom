import ShopCategoryPage from "@/components/shop-category-page";
import type { Metadata } from "next";

type PageProps = {
  searchParams?: Promise<{
    sort?: string;
    limit?: string;
    cursor?: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "For Her | PLAY ME",
    description: "Premium pleasure products designed for her.",
  };
}

export default async function ForHerPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={{
        slug: "for-her",
        collectionHandle: "til-henne",
        eyebrow: "For Her",
        title: "Designed For Her Pleasure",
        fallbackDescription: "Premium pleasure products designed for her.",
        accentClass: "text-pink-400",
        gradientClass: "from-pink-950/60",
      }}
    />
  );
}