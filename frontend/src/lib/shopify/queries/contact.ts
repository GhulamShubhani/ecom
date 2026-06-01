export const getShopInfoQuery = /* GraphQL */ `
  query getShopInfo {
    shop {
      name
      metafields(
        identifiers: [
          { namespace: "contact", key: "email" }
          { namespace: "contact", key: "phone" }
          { namespace: "contact", key: "address" }
          { namespace: "contact", key: "hours" }
        ]
      ) {
        key
        value
      }
    }
  }
`;