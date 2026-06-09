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
    title: `Men | ${BRAND.name}`,
    description: "Premium men's fashion — tailoring, denim, shirts and wardrobe essentials.",
  };
}

export default async function ForHimPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={AUDIENCE_COLLECTIONS.forHim}
    />
  );
}
