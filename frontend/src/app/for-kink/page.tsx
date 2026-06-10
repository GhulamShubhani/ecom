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
    title: `New Arrivals | ${BRAND.name}`,
    description: "The latest clothing, footwear and accessories — just landed at Apni Dukan.",
  };
}

export default async function ForKinkPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};

  return (
    <ShopCategoryPage
      searchParams={params}
      config={AUDIENCE_COLLECTIONS.newArrivals}
    />
  );
}
