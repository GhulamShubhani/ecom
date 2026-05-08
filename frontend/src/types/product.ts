export type ProductSize =
  | '34' | '36' | '38' | '40' | '42' | '44' | '46'
  | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductTag = 'NEW IN' | 'BESTSELLER' | 'SALE';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency?: string;
  image: string;
  hoverImage?: string;
  sizes?: ProductSize[];
  hasMoreColors?: boolean;
  tag?: ProductTag;
  /** When true, the card shows "Add to cart" instead of size selector (accessories). */
  isAccessory?: boolean;
}
