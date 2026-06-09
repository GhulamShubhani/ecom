import ShopCategoryPage from "@/components/shop-category-page";
import { AUDIENCE_COLLECTIONS } from "@/constants/audience-collections";
import { BRAND } from "@/constants/brand";
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
    title: `Women | ${BRAND.name}`,
    description: "Premium women's fashion — dresses, tops, denim and seasonal edits.",
  };
}

export default async function ForHerPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={AUDIENCE_COLLECTIONS.forHer}
    />
  );
}
