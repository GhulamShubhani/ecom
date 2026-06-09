import seoFragment from "./seo";

export const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
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
    products(first: 1) {
      filters {
        id
        label
        values {
          id
          label
          count
        }
      }
    }
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`;