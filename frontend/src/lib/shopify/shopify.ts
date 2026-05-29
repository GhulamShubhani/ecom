function getRequiredEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is missing in .env.local`);
  }

  return value;
}

const domain = getRequiredEnv("SHOPIFY_STORE_DOMAIN");
const token = getRequiredEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-07";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    console.error("Shopify error:", json.errors);
    throw new Error("Failed to fetch data from Shopify");
  }

  return json.data as T;
}

export type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  image: { url: string; altText: string | null } | null;
  products: {
    edges: { node: { id: string } }[];
  };
};

type CollectionsQueryResult = {
  collections: {
    edges: { node: ShopifyCollection }[];
  };
};

const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!, $productsFirst: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
          }
          products(first: $productsFirst) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCollections(
  { first = 20, productsFirst = 250 }: { first?: number; productsFirst?: number } = {}
): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<CollectionsQueryResult>(COLLECTIONS_QUERY, {
    first,
    productsFirst,
  });

  return data.collections.edges.map((edge) => edge.node);
}

