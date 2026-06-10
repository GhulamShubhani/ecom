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
    title: `Dresses | ${BRAND.name}`,
    description: "Elegant dresses for every occasion — evening, daywear and seasonal silhouettes.",
  };
}

export default async function ForCouplesPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={AUDIENCE_COLLECTIONS.dresses}
    />
  );
}
