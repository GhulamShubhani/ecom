import { articleFragment, articleMetaFragment } from "../fragments/article";

export const getArticlesQuery = /* GraphQL */ `
  query getArticles(
    $first: Int!
    $sortKey: ArticleSortKeys
    $reverse: Boolean
    $query: String
  ) {
    articles(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      edges {
        node {
          ...articleMeta
        }
      }
    }
  }
  ${articleMetaFragment}
`;

export const getArticleQuery = /* GraphQL */ `
  query getArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        ...article
      }
    }
  }
  ${articleFragment}
`;
