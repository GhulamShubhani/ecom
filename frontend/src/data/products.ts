import type { Product } from '@/types/product';

/**
 * Static product data — modeled after playme-shop.com.
 * Images are hosted on Unsplash (royalty free).
 * Replace with your CMS / Shopify products in production.
 */

const STD_SIZES_F: Product['sizes'] = ['34', '36', '38', '40', '42', '44', '46'];
const SHORT_SIZES: Product['sizes'] = ['34', '36', '38', '40', '42'];
const ALPHA_SIZES: Product['sizes'] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

/** Card-sized image (small, fast). */
const card = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

/** Editorial / hero image (larger, higher quality). */
const wide = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=75`;

export const OCCASION_EDIT: Product[] = [
  {
    id: 'anna-dress-berry',
    slug: 'anna-dress-berry',
    name: 'Anna Dress',
    price: 357,
    image: card('photo-1611591437281-460bfbe1220a'),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'zoe-top',
    slug: 'zoe-top',
    name: 'Zoe Top',
    price: 158,
    image: card('photo-1485518882345-15568b007407'),
    sizes: STD_SIZES_F,
    tag: 'NEW IN',
  },
  {
    id: 'bree-dress',
    slug: 'bree-dress',
    name: 'Bree Dress',
    price: 337,
    image: card('photo-1496747611176-843222e1e57c'),
    sizes: ['34', '36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'long-pebble-earrings',
    slug: 'the-long-pebble-earrings',
    name: 'The Long Pebble Earrings',
    price: 139,
    image: card('photo-1535632787350-4e68ef0ac584'),
    isAccessory: true,
  },
  {
    id: 'zaha-dress',
    slug: 'zaha-dress',
    name: 'Zaha Dress',
    price: 278,
    image: card('photo-1539109136881-3be0616acf4b'),
    sizes: ['34', '36', '38', '40', '42', '46'],
    tag: 'NEW IN',
  },
  {
    id: 'anna-dress-yellow',
    slug: 'anna-dress-yellow-mimosa-print',
    name: 'Anna Dress',
    price: 357,
    image: card('photo-1483985988355-763728e1935b'),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'curved-bangle',
    slug: 'the-curved-bangle',
    name: 'The Curved Bangle',
    price: 139,
    image: card('photo-1611591437281-460bfbe1220a'),
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'lune-skirt',
    slug: 'lune-skirt-yellow-mimosa-print',
    name: 'Lune Skirt',
    price: 238,
    image: card('photo-1503342217505-b0a15ec3261c'),
    sizes: SHORT_SIZES,
    tag: 'NEW IN',
  },
  {
    id: 'long-pearl-earrings',
    slug: 'the-long-pearl-earrings',
    name: 'The Long Pearl Earrings',
    price: 166,
    image: card('photo-1599643477877-530eb83abc8e'),
    isAccessory: true,
  },
];

export const FAVOURITES: Product[] = [
  {
    id: 'cleo-blazer',
    slug: 'cleo-blazer',
    name: 'Cleo Blazer',
    price: 357,
    image: card('photo-1591047139829-d91aecb6caea'),
    sizes: ['44'],
    tag: 'NEW IN',
  },
  {
    id: 'bree-dress-fav',
    slug: 'bree-dress',
    name: 'Bree Dress',
    price: 337,
    image: card('photo-1502716119720-b23a93e5fe1b'),
    sizes: ['34', '36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'daria-shorts',
    slug: 'daria-shorts-sand-melange',
    name: 'Daria Shorts',
    price: 198,
    image: card('photo-1473966968600-fa801b869a1a'),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'cordova-basket',
    slug: 'cordova-basket-small',
    name: 'Cordova Basket Small',
    price: 288,
    image: card('photo-1591561954557-26941169b49e'),
    isAccessory: true,
    hasMoreColors: true,
  },
  {
    id: 'angel-vest',
    slug: 'angel-vest',
    name: 'Angel Vest',
    price: 218,
    image: card('photo-1542295669297-4d352b042bca'),
    sizes: SHORT_SIZES,
    tag: 'NEW IN',
  },
  {
    id: 'angie-trouser',
    slug: 'angie-trouser-cream',
    name: 'Angie Trouser',
    price: 257,
    image: card('photo-1509631179647-0177331693ae'),
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
    image: card('photo-1469334031218-e382a71b716b'),
    sizes: STD_SIZES_F,
  },
  {
    id: 'lulu-blouse',
    slug: 'lu-lu-blouse',
    name: 'Lu Lu Blouse',
    price: 218,
    image: card('photo-1581338834647-b0fb40704e21'),
    sizes: STD_SIZES_F,
  },
  {
    id: 'leandra-dress',
    slug: 'leandra-dress-navy',
    name: 'Leandra Dress',
    price: 257,
    image: card('photo-1485968579580-b6d095142e6e'),
    sizes: ['36', '38', '40', '42', '44'],
    hasMoreColors: true,
  },
  {
    id: 'emily-blouse',
    slug: 'emily-blouse',
    name: 'Emily Blouse',
    price: 178,
    image: card('photo-1488161628813-04466f872be2'),
    sizes: ['36', '38', '40', '42', '44'],
    tag: 'NEW IN',
  },
  {
    id: 'aivy-dress',
    slug: 'aivy-dress',
    name: 'Aivy Dress',
    price: 337,
    image: card('photo-1572804013309-59a88b7e92f1'),
    sizes: ['34', '36', '38', '42'],
    tag: 'NEW IN',
  },
  {
    id: 'liza-blouse',
    slug: 'liza-blouse-navy',
    name: 'Liza Blouse',
    price: 158,
    image: card('photo-1496747611176-843222e1e57c'),
    sizes: STD_SIZES_F,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'hyro-skirt',
    slug: 'hyro-skirt-cream',
    name: 'Hyro Skirt',
    price: 265,
    image: card('photo-1551803091-e20673f15770'),
    sizes: STD_SIZES_F,
  },
];

export const DENIM_FAVOURITES: Product[] = [
  {
    id: 'elmer-polo',
    slug: 'elmer-polo-shirt-light-pink-stripe',
    name: 'Elmer Polo Shirt',
    price: 120.36,
    image: card('photo-1503944583220-79d8926ad5e2'),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
  {
    id: 'marley-shirt',
    slug: 'marley-shirt-light-pink',
    name: 'Marley Shirt',
    price: 240.72,
    image: card('photo-1554412933-514a83d2f3c8'),
    sizes: ['34', '36', '38', '40', '42', '44'],
    hasMoreColors: true,
  },
  {
    id: 'ezra-tee',
    slug: 'ezra-tee-light-pink',
    name: 'Ezra Tee',
    price: 92,
    image: card('photo-1521572163474-6864f9cf17ab'),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
  {
    id: 'ivy-tote',
    slug: 'ivy-tote-bag-light-pink-stripe',
    name: 'Ivy Tote Bag',
    price: 159,
    image: card('photo-1547949003-9792a18a2601'),
    isAccessory: true,
    hasMoreColors: true,
    tag: 'NEW IN',
  },
  {
    id: 'peggy-rib-top',
    slug: 'peggy-rib-boatneck-top-light-pink',
    name: 'Peggy Rib Boatneck Top',
    price: 60.18,
    image: card('photo-1492707892479-7bc8d5a4ee93'),
    sizes: ALPHA_SIZES,
    hasMoreColors: true,
  },
];

export const HERO_LOOKS = [
  {
    id: 'hero-1',
    image: wide('photo-1490481651871-ab68de25d43d'),
    alt: 'Model wearing summer occasion dress',
  },
  {
    id: 'hero-2',
    image: wide('photo-1469334031218-e382a71b716b'),
    alt: 'Model in soft tailoring outdoor portrait',
  },
] as const;

export const EDITORIAL_IMAGES = {
  froyaJuliana: wide('photo-1496747611176-843222e1e57c'),
  may17:        wide('photo-1485968579580-b6d095142e6e'),
  pihlDenim:    wide('photo-1542272604-787c3835535d'),
  denimGuide:   wide('photo-1604176354204-9268737828e4'),
  essentials:   wide('photo-1496747611176-843222e1e57c'),
} as const;
