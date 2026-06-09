import { NextRequest, NextResponse } from "next/server";
import { getCollectionsPage } from "@/lib/shopify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const first = Number(searchParams.get("first") ?? 20);
  const after = searchParams.get("after");

  try {
    const page = await getCollectionsPage({
      first: Number.isFinite(first) ? Math.min(Math.max(first, 1), 50) : 20,
      after,
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Collections API failed:", error);

    return NextResponse.json(
      { collections: [], pageInfo: { hasNextPage: false, endCursor: null } },
      { status: 500 }
    );
  }
}
