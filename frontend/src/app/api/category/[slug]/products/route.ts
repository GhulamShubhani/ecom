import { NextRequest, NextResponse } from "next/server";
import {
  CATEGORY_PAGE_SIZE,
  fetchCategoryProductsPage,
  mapShopifyProductToHomeProduct,
} from "@/lib/category-products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const after = searchParams.get("after");
  const sort = searchParams.get("sort") ?? undefined;
  const first = Number(searchParams.get("first") ?? CATEGORY_PAGE_SIZE);

  try {
    const page = await fetchCategoryProductsPage({
      slug,
      sort,
      after,
      first: Number.isFinite(first)
        ? Math.min(Math.max(first, 1), 40)
        : CATEGORY_PAGE_SIZE,
    });

    if (!page) {
      return NextResponse.json(
        { products: [], pageInfo: { hasNextPage: false, endCursor: null }, totalCount: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      products: page.products.map((product, index) =>
        mapShopifyProductToHomeProduct(product, index, page.categoryTitle)
      ),
      pageInfo: page.pageInfo,
      totalCount: page.totalCount,
    });
  } catch (error) {
    console.error("Category products API failed:", error);

    return NextResponse.json(
      {
        products: [],
        pageInfo: { hasNextPage: false, endCursor: null },
        totalCount: 0,
      },
      { status: 500 }
    );
  }
}
