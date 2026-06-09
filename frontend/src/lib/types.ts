import { LucideIcon } from 'lucide-react';

export interface HomeNavLink {
  label: string;
  href: string;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  count: number;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge: string;
  rating: number;
  reviewCount: number;
  category: string;
  isBestseller: boolean;
  image: string;
  href: string;
  /** Product slug used for the /product/[handle] route. */
  handle?: string;
  /** First Shopify variant id — required to add the product to the cart. */
  variantId?: string;
  /** Currency for the price, used for the optimistic cart line. */
  currencyCode?: string;
  availableForSale?: boolean;
}

export interface Brand {
  id: string;
  name: string;
}
