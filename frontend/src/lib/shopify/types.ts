export type Menu = {
  title: string;
  path: string;
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Edge<T> = {
  node: T;
  cursor?: string;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  compareAtPrice?: Money | null;
};

export type ProductMetafield = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SEO = {
  title: string;
  description: string;
};
export type ShopifyProduct = {
  id: string;
  handle: string;
  vendor: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  collections: Connection<ShopifyCollection>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  metafields?: Connection<ProductMetafield>;
};

export type Product = Omit<ShopifyProduct, "variants" | "images" | "collections" | "metafields"> & {
  variants: ProductVariant[];
  images: Image[];
  collections: Collection[];
  metafields: ProductMetafield[];
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    first?: number;
    after?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: Image | null;
  products?: {
    filters?: ShopifyProductFilter[];
  };
  seo: SEO;
  updatedAt: string;
};

export type Collection = ShopifyCollection & {
  path: string;
  productCount: number;
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
  variables: {
    first?: number;
    after?: string;
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection | null;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: ShopifyCollectionProducts | null;
  };
  variables: {
    handle: string;
    first?: number;
    after?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionProducts = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: Image | null;
  seo: SEO;
  updatedAt: string;
  products: Connection<ShopifyProduct> & {
    filters?: ShopifyProductFilter[];
  };
};

export type ShopifyProductFilter = {
  id: string;
  label: string;
  values: {
    id: string;
    label: string;
    count: number;
  }[];
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
    intent?: "RELATED" | "COMPLEMENTARY";
  };
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type Article = {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  tags: string[];
  image: Image | null;
  authorV2: { name: string } | null;
  blog: { handle: string; title: string };
  /** Only present on the detail query. */
  contentHtml?: string;
  seo?: SEO;
};

export type ShopifyArticlesOperation = {
  data: {
    articles: Connection<Article>;
  };
  variables: {
    first: number;
    sortKey?: string;
    reverse?: boolean;
    query?: string;
  };
};

export type ShopifyArticleOperation = {
  data: {
    blog: {
      articleByHandle: Article | null;
    } | null;
  };
  variables: {
    blogHandle: string;
    articleHandle: string;
  };
};

export type ShopContact = {
  name: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
};

export type ShopInfoOperation = {
  data: {
    shop: {
      name: string;
      metafields: ({ key: string; value: string } | null)[];
    };
  };
  variables: Record<string, never>;
};