import imageFragment from "./image";
import seoFragment from "./seo";

/**
 * Lightweight article shape used for listings (no full body content).
 */
export const articleMetaFragment = /* GraphQL */ `
  fragment articleMeta on Article {
    id
    handle
    title
    excerpt
    publishedAt
    tags
    image {
      ...image
    }
    authorV2 {
      name
    }
    blog {
      handle
      title
    }
  }
  ${imageFragment}
`;

/**
 * Full article shape used on the detail page (includes the rendered body).
 */
export const articleFragment = /* GraphQL */ `
  fragment article on Article {
    ...articleMeta
    contentHtml
    seo {
      ...seo
    }
  }
  ${articleMetaFragment}
  ${seoFragment}
`;
