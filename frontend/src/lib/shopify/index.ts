import { NextRequest, NextResponse } from "next/server";
import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import {  ShopContact, ShopInfoOperation } from "./types";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionQuery,
  getCollectionProductsQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import { getArticleQuery, getArticlesQuery } from "./queries/article";
import {
  Article,
  Cart,
  Collection,
  Connection,
  Image,
  ShopifyArticleOperation,
  ShopifyArticlesOperation,
  Menu,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyProductFilter,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { BRAND } from "@/constants/brand";
import { getShopInfoQuery } from "./queries/contact";
import { getPageQuery, getPagesQuery } from "./queries/page";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;
export async function shopifyFetch<T>({
  cache = "no-store",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message,
        query,
      };
    }

    throw {
      error,
      query,
    };
  }
}

function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map((edge) => edge?.node);
}

function getPageInfo<T>(connection?: Connection<T>) {
  return {
    hasNextPage: Boolean(connection?.pageInfo?.hasNextPage),
    endCursor: connection?.pageInfo?.endCursor ?? null,
  };
}

function getProductCountFromFilters(filters: ShopifyProductFilter[] = []) {
  const preferredFilters = [
    "filter.p.product_type",
    "filter.v.availability",
    "filter.p.vendor",
  ];
  const filter =
    preferredFilters
      .map((id) => filters.find((item) => item.id === id))
      .find(Boolean) ?? filters[0];

  if (!filter?.values?.length) return 0;

  const uniqueCounts = new Map<string, number>();

  for (const value of filter.values) {
    uniqueCounts.set(value.id, value.count);
  }

  return Array.from(uniqueCounts.values()).reduce((total, count) => total + count, 0);
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
}
function reshapeProduct(
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { collections, images, variants, metafields, ...rest } = product;

  return {
    ...rest,
    collections: reshapeCollections(removeEdgesAndNodes(collections)),
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
    metafields: metafields ? removeEdgesAndNodes(metafields) : [],
  };
}
function reshapeProducts(products: ShopifyProduct[]) {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
}

const DEFAULT_SHOP_CONTACT: ShopContact = {
  name: BRAND.name,
  email: BRAND.email,
  phone: BRAND.phone,
  address: BRAND.address,
  hours: "Mon–Fri · 09:00–18:00 CET",
};

export async function getShopContact(
  overrides?: Partial<ShopContact>
): Promise<ShopContact> {
  const fallback: ShopContact = { ...DEFAULT_SHOP_CONTACT, ...overrides };

  try {
    const res = await shopifyFetch<ShopInfoOperation>({
      query: getShopInfoQuery,
      tags: [TAGS.collections],
    });
    
    const shop = res.body?.data?.shop;
    const metafields = (shop?.metafields ?? []).filter(
      (entry): entry is { key: string; value: string } => Boolean(entry?.value)
    );
    const values = Object.fromEntries(metafields.map((m) => [m.key, m.value]));

    return {
      name: shop?.name?.trim() || fallback.name,
      email: values.email?.trim() || fallback.email,
      phone: values.phone?.trim() || fallback.phone,
      address: values.address?.trim() || fallback.address,
      hours: values.hours?.trim() || fallback.hours,
    };
  } catch (error) {
    console.error('getShopContact failed, using fallback:', error);
    return fallback;
  }
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    cache: "force-cache",
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/search")
        .replace("/pages", ""),
    })) || []
  );
}

export type SearchProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

// type ShopifyProductsOperation = {
//   data: {
//     products: {
//       edges: { node: SearchProduct }[];
//     };
//   };
//   variables: { query?: string; first: number };
// };

// const getProductsQuery = /* GraphQL */ `
//   query getProducts($query: String, $first: Int!) {
//     products(query: $query, first: $first) {
//       edges {
//         node {
//           id
//           handle
//           title
//           featuredImage {
//             url
//             altText
//           }
//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export async function getProducts({
//   query,
//   first = 24,
// }: { query?: string; first?: number } = {}): Promise<SearchProduct[]> {
//   const res = await shopifyFetch<ShopifyProductsOperation>({
//     query: getProductsQuery,
//     tags: [TAGS.products],
//     variables: { query, first },
//   });

//   return res.body?.data?.products?.edges.map((edge) => edge.node) ?? [];
// }

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const products: Product[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const page = await getProductsPage({
      query,
      reverse,
      sortKey,
      first: 250,
      after,
    });

    products.push(...page.products);
    hasNextPage = page.pageInfo.hasNextPage;
    after = page.pageInfo.endCursor;
  }

  return products;
}

export async function getProductsPage({
  query,
  first = 24,
  after,
  reverse,
  sortKey,
}: {
  query?: string;
  first?: number;
  after?: string | null;
  reverse?: boolean;
  sortKey?: string;
}): Promise<{
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    cache: "force-cache",
    tags: [TAGS.products],
    variables: {
      query,
      first,
      ...(after && { after }),
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED_AT" : sortKey,
    },
  });

  return {
    products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
    pageInfo: getPageInfo(res.body.data.products),
  };
}

function reshapeCollection(
  collection: ShopifyCollection
): Collection | undefined {
  if (!collection) return undefined;

  return {
    ...collection,
    path: `/collections/${collection.handle}`,
    productCount: getProductCountFromFilters(collection.products?.filters),
  };
}

function reshapeCollections(collections: ShopifyCollection[]) {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
}

export async function getCollectionsPage({
  first = 20,
  after,
}: {
  first?: number;
  after?: string | null;
} = {}): Promise<{
  collections: Collection[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    cache: "no-store",
    tags: [TAGS.collections],
    variables: {
      first,
      ...(after && { after }),
    },
  });

  const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);

  
  const collections = reshapeCollections(shopifyCollections).filter(
    (collection) => !collection.handle.startsWith("hidden")
  );

  return {
    collections,
    pageInfo: getPageInfo(res.body.data.collections),
  };
}

export async function getCollections(): Promise<Collection[]> {
  const collections: Collection[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const page = await getCollectionsPage({ first: 250, after });

    collections.push(...page.collections);
    hasNextPage = page.pageInfo.hasNextPage;
    after = page.pageInfo.endCursor;
  }

  return [
    {
      handle: "",
      title: "All",
      description: "All products",
      descriptionHtml: "All products",
      image: null,
      products: { filters: [] },
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      productCount: 0,
      updatedAt: new Date().toISOString(),
    },
    ...collections,
  ];
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    cache: "force-cache",
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  });

  return res.body.data.collection
    ? reshapeCollection(res.body.data.collection)
    : undefined;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const products: Product[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const page = await getCollectionProductsPage({
      collection,
      first: 250,
      after,
      reverse,
      sortKey,
    });

    products.push(...page.products);
    hasNextPage = page.pageInfo.hasNextPage;
    after = page.pageInfo.endCursor;
  }

  return products;
}

export async function getCollectionProductsPage({
  collection,
  first = 24,
  after,
  reverse,
  sortKey,
}: {
  collection: string;
  first?: number;
  after?: string | null;
  reverse?: boolean;
  sortKey?: string;
}): Promise<{
  collection:
    | {
        handle: string;
        title: string;
        description: string;
        descriptionHtml: string;
        image: Image | null;
        productCount: number;
        seo: { title: string; description: string };
        updatedAt: string;
      }
    | null;
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    cache: "force-cache",
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      first,
      ...(after && { after }),
      reverse,
      sortKey:
        sortKey === "RELEVANCE"
          ? undefined
          : sortKey === "CREATED_AT"
            ? "CREATED"
            : sortKey,
    },
  });

  if (!res.body.data.collection) {
    return {
      collection: null,
      products: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  const collectionData = res.body.data.collection;

  return {
    collection: {
      handle: collectionData.handle,
      title: collectionData.title,
      description: collectionData.description,
      descriptionHtml: collectionData.descriptionHtml,
      image: collectionData.image,
      productCount: getProductCountFromFilters(collectionData.products.filters),
      seo: collectionData.seo,
      updatedAt: collectionData.updatedAt,
    },
    products: reshapeProducts(removeEdgesAndNodes(collectionData.products)),
    pageInfo: getPageInfo(collectionData.products),
  };
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    cache: "force-cache",
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });
  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
  intent: "RELATED" | "COMPLEMENTARY" = "RELATED"
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    cache: "force-cache",
    tags: [TAGS.products],
    variables: {
      productId,
      intent,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations ?? []);
}

export async function getComplementaryProducts(
  productId: string
): Promise<Product[]> {
  return getProductRecommendations(productId, "COMPLEMENTARY");
}

export async function getArticles({
  first = 24,
  query,
  reverse = true,
  sortKey = "PUBLISHED_AT",
}: {
  first?: number;
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Promise<Article[]> {
  try {
    const res = await shopifyFetch<ShopifyArticlesOperation>({
      query: getArticlesQuery,
      cache: "force-cache",
      tags: [TAGS.articles],
      variables: { first, query, reverse, sortKey },
    });

    return removeEdgesAndNodes(res.body.data.articles);
  } catch (error) {
    console.error("getArticles failed:", error);
    return [];
  }
}

export async function getArticle(
  blogHandle: string,
  articleHandle: string
): Promise<Article | undefined> {
  try {
    const res = await shopifyFetch<ShopifyArticleOperation>({
      query: getArticleQuery,
      cache: "force-cache",
      tags: [TAGS.articles],
      variables: { blogHandle, articleHandle },
    });

    return res.body.data.blog?.articleByHandle ?? undefined;
  } catch (error) {
    console.error("getArticle failed:", error);
    return undefined;
  }
}

function reshapeCart(cart: ShopifyCart): Cart {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(
  cartId: string | undefined
): Promise<Cart | undefined> {
  if (!cartId) return undefined;

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
  });

  // old carts becomes 'null' when you checkout
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-store",
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
    cache: "no-cache",
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

// // This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.

  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
    const headersStore = await headers();
  
  const topic = headersStore.get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections,"max");
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products,"max");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: "no-store",
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: "no-store",
  });

  return removeEdgesAndNodes(res.body.data.pages);
}