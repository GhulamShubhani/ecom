import type { Product } from '@/types/product';
import { IMAGES, productCardImage } from '@/constants/images';

/**
 * Static product data for legacy demo components.
 * Images are served locally from `/public/images/`.
 * Production catalog uses Shopify product images.
 */

const STD_SIZES_F: Product['sizes'] = ['34', '36', '38', '40', '42', '44', '46'];
const SHORT_SIZES: Product['sizes'] = ['34', '36', '38', '40', '42'];
const ALPHA_SIZES: Product['sizes'] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

let cardIndex = 0;
const card = () => productCardImage(cardIndex++);

export const OCCASION_EDIT: Product[] = [
  {
    id: 'anna-dress-berry',
    slug: 'anna-dress-berry',
    name: 'Anna Dress',
    price: 357,
    image: card(),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'zoe-top',
    slug: 'zoe-top',
    name: 'Zoe Top',
    price: 158,
    image: card(),
    sizes: STD_SIZES_F,
    tag: 'NEW IN',
  },
  {
    id: 'bree-dress',
    slug: 'bree-dress',
    name: 'Bree Dress',
    price: 337,
    image: card(),
    sizes: ['34', '36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'long-pebble-earrings',
    slug: 'the-long-pebble-earrings',
    name: 'The Long Pebble Earrings',
    price: 139,
    image: card(),
    isAccessory: true,
  },
  {
    id: 'zaha-dress',
    slug: 'zaha-dress',
    name: 'Zaha Dress',
    price: 278,
    image: card(),
    sizes: ['34', '36', '38', '40', '42', '46'],
    tag: 'NEW IN',
  },
  {
    id: 'anna-dress-yellow',
    slug: 'anna-dress-yellow-mimosa-print',
    name: 'Anna Dress',
    price: 357,
    image: card(),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'curved-bangle',
    slug: 'the-curved-bangle',
    name: 'The Curved Bangle',
    price: 139,
    image: card(),
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'lune-skirt',
    slug: 'lune-skirt-yellow-mimosa-print',
    name: 'Lune Skirt',
    price: 238,
    image: card(),
    sizes: SHORT_SIZES,
    tag: 'NEW IN',
  },
  {
    id: 'long-pearl-earrings',
    slug: 'the-long-pearl-earrings',
    name: 'The Long Pearl Earrings',
    price: 166,
    image: card(),
    isAccessory: true,
  },
];

export const FAVOURITES: Product[] = [
  {
    id: 'cleo-blazer',
    slug: 'cleo-blazer',
    name: 'Cleo Blazer',
    price: 357,
    image: card(),
    sizes: ['44'],
    tag: 'NEW IN',
  },
  {
    id: 'bree-dress-fav',
    slug: 'bree-dress',
    name: 'Bree Dress',
    price: 337,
    image: card(),
    sizes: ['34', '36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'daria-shorts',
    slug: 'daria-shorts-sand-melange',
    name: 'Daria Shorts',
    price: 198,
    image: card(),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'cordova-basket',
    slug: 'cordova-basket-small',
    name: 'Cordova Basket Small',
    price: 288,
    image: card(),
    isAccessory: true,
    hasMoreColors: true,
  },
  {
    id: 'angel-vest',
    slug: 'angel-vest',
    name: 'Angel Vest',
    price: 218,
    image: card(),
    sizes: SHORT_SIZES,
    tag: 'NEW IN',
  },
  {
    id: 'angie-trouser',
    slug: 'angie-trouser-cream',
    name: 'Angie Trouser',
    price: 257,
    image: card(),
    sizes: ['34', '36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
];

export const MAY_17_LOOKS: Product[] = [
  {
    id: 'lia-dress',
    slug: 'lia-dress',
    name: 'Lia Dress',
    price: 238,
    image: card(),
    sizes: STD_SIZES_F,
  },
  {
    id: 'lulu-blouse',
    slug: 'lu-lu-blouse',
    name: 'Lu Lu Blouse',
    price: 218,
    image: card(),
    sizes: STD_SIZES_F,
  },
  {
    id: 'leandra-dress',
    slug: 'leandra-dress-navy',
    name: 'Leandra Dress',
    price: 257,
    image: card(),
    sizes: ['36', '38', '40', '42', '44'],
    hasMoreColors: true,
  },
  {
    id: 'emily-blouse',
    slug: 'emily-blouse',
    name: 'Emily Blouse',
    price: 178,
    image: card(),
    sizes: ['36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'aivy-dress',
    slug: 'aivy-dress',
    name: 'Aivy Dress',
    price: 337,
    image: card(),
    sizes: ['34', '36', '38', '42'],
    tag: 'NEW IN',
  },
  {
    id: 'liza-blouse',
    slug: 'liza-blouse-navy',
    name: 'Liza Blouse',
    price: 158,
    image: card(),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'hyro-skirt',
    slug: 'hyro-skirt-cream',
    name: 'Hyro Skirt',
    price: 265,
    image: card(),
    sizes: STD_SIZES_F,
  },
];

export const DENIM_FAVOURITES: Product[] = [
  {
    id: 'elmer-polo',
    slug: 'elmer-polo-shirt-light-pink-stripe',
    name: 'Elmer Polo Shirt',
    price: 120.36,
    image: card(),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
  {
    id: 'marley-shirt',
    slug: 'marley-shirt-light-pink',
    name: 'Marley Shirt',
    price: 240.72,
    image: card(),
    sizes: ['34', '36', '38', '40', '42', '44'],
    hasMoreColors: true,
  },
  {
    id: 'ezra-tee',
    slug: 'ezra-tee-light-pink',
    name: 'Ezra Tee',
    price: 92,
    image: card(),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
  {
    id: 'ivy-tote',
    slug: 'ivy-tote-bag-light-pink-stripe',
    name: 'Ivy Tote Bag',
    price: 159,
    image: card(),
    isAccessory: true,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'peggy-rib-top',
    slug: 'peggy-rib-boatneck-top-light-pink',
    name: 'Peggy Rib Boatneck Top',
    price: 60.18,
    image: card(),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
];

export const HERO_LOOKS = [
  {
    id: 'hero-1',
    image: IMAGES.banners.hero,
    alt: 'Luxury fashion boutique hero with contemporary street style',
  },
  {
    id: 'hero-2',
    image: IMAGES.banners.overlay,
    alt: 'Warm editorial fashion atmosphere',
  },
] as const;

export const EDITORIAL_IMAGES = {
  froyaJuliana: IMAGES.editorial.forHer,
  may17: IMAGES.editorial.forHim,
  pihlDenim: IMAGES.editorial.forCouples,
  denimGuide: IMAGES.banners.promoSplit,
  essentials: IMAGES.editorial.essentials,
} as const;
