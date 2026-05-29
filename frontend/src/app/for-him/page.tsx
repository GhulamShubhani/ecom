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
    title: "For Him | PLAY ME",
    description: "Premium pleasure products designed for him.",
  };
}

export default async function ForHimPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={{
        slug: "for-him",
        collectionHandle: "til-han",
        eyebrow: "For Him",
        title: "Engineered For His Pleasure",
        fallbackDescription: "Premium pleasure products designed for him.",
        accentClass: "text-blue-400",
        gradientClass: "from-blue-950/60",
      }}
    />
  );
}