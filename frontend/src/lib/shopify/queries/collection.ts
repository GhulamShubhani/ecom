import { collectionFragment } from "../fragments/collection";
import { productFragment } from "../fragments/product";

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections($first: Int = 250, $after: String) {
    collections(first: $first, after: $after, sortKey: TITLE) {
      edges {
        cursor
        node {
          ...collection
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${collectionFragment}
`;

export const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int = 100
    $after: String
  ) {
    collection(handle: $handle) {
      handle
      title
      description
      descriptionHtml
      image {
        url
        altText
        width
        height
      }
      seo {
        title
        description
      }
      updatedAt
      products(sortKey: $sortKey, reverse: $reverse, first: $first, after: $after) {
        filters {
          id
          label
          values {
            id
            label
            count
          }
        }
        edges {
          cursor
          node {
            ...product
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${productFragment}
`;
