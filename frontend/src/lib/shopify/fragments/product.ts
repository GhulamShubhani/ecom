import imageFragment from "./image";
import seoFragment from "./seo";

export const productFragment = /* GraphQl */ `
    fragment product on Product {
    id
    handle
    vendor
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 250) {
      edges {
        node {
          ...image
        }
      }
    }
    collections(first: 250) {
      edges {
        node {
          handle
          title
          description
          image {
            ...image
          }
          seo {
            ...seo
          }
          updatedAt
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
    }
    ${imageFragment}
    ${seoFragment}
`;