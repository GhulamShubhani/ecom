import { NextRequest, NextResponse } from "next/server";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollectionProductsPage } from "@/lib/shopify";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const searchParams = request.nextUrl.searchParams;
  const first = Number(searchParams.get("first") ?? 20);
  const after = searchParams.get("after");
  const sort = searchParams.get("sort");
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  try {
    const page = await getCollectionProductsPage({
      collection: handle,
      first: Number.isFinite(first) ? Math.min(Math.max(first, 1), 40) : 20,
      after,
      sortKey,
      reverse,
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Collection products API failed:", error);

    return NextResponse.json(
      {
        collection: null,
        products: [],
        pageInfo: { hasNextPage: false, endCursor: null },
      },
      { status: 500 }
    );
  }
}
