import { CreditCard, Lock, RefreshCw, Truck } from 'lucide-react';
import type {
  BlogPost,
  Brand,
  Category,
  HomeNavLink,
  Product,
  TrustItem,
} from '@/lib/types';

export const HOME_NAV_LINKS: HomeNavLink[] = [
  { label: 'Shop', href: '/' },
  { label: 'Women', href: '/for-her' },
  { label: 'Men', href: '/for-him' },
  { label: 'Dresses', href: '/collections/dresses' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Contact', href: '/contact' },
  { label: 'About Us', href: '/about-us' },
];

export const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick delivery on dresses, clothing, denim and accessories.',
  },
  {
    icon: Lock,
    title: 'Secure Shopping',
    description: 'Safe checkout with protected payments.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Pay easily with card, wallet, or online payment options.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Simple return and exchange support on eligible items.',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-dresses',
    name: 'Dresses',
    emoji: '👗',
    count: 124,
    href: '/search?q=dresses',
  },
  {
    id: 'cat-clothing',
    name: 'Clothing',
    emoji: '👕',
    count: 92,
    href: '/search?q=clothing',
  },
  {
    id: 'cat-belts',
    name: 'Belts',
    emoji: '🧥',
    count: 76,
    href: '/search?q=belts',
  },
  {
    id: 'cat-bags',
    name: 'Bags',
    emoji: '👜',
    count: 58,
    href: '/search?q=bags',
  },
  {
    id: 'cat-new',
    name: 'New Arrivals',
    emoji: '✨',
    count: 45,
    href: '/search?sort=latest-desc',
  },
  {
    id: 'cat-best',
    name: 'Bestsellers',
    emoji: '🏆',
    count: 88,
    href: '/search?sort=trending-desc',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Elegant Floral Summer Dress',
    price: 89,
    originalPrice: 119,
    badge: 'BESTSELLER',
    rating: 5,
    reviewCount: 128,
    category: 'Dresses',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=elegant+floral+summer+dress',
  },
  {
    id: 'p2',
    name: 'Classic Casual Shirt',
    price: 74,
    badge: 'NEW',
    rating: 5,
    reviewCount: 142,
    category: 'Clothing',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=classic+casual+shirt',
  },
  {
    id: 'p3',
    name: 'Premium Leather Belt',
    price: 49,
    badge: 'BESTSELLER',
    rating: 5,
    reviewCount: 115,
    category: 'Belts',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=premium+leather+belt',
  },
  {
    id: 'p4',
    name: 'Stylish Everyday Handbag',
    price: 99,
    originalPrice: 129,
    badge: 'TRENDING',
    rating: 5,
    reviewCount: 96,
    category: 'Bags',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=stylish+everyday+handbag',
  },
  {
    id: 'p5',
    name: 'Denim Jacket',
    price: 109,
    badge: 'BESTSELLER',
    rating: 5,
    reviewCount: 103,
    category: 'Clothing',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=denim+jacket',
  },
  {
    id: 'p6',
    name: 'Party Wear Maxi Dress',
    price: 129,
    originalPrice: 159,
    badge: 'NEW',
    rating: 5,
    reviewCount: 87,
    category: 'Dresses',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=party+wear+maxi+dress',
  },
  {
    id: 'p7',
    name: 'Minimal Crossbody Bag',
    price: 79,
    badge: 'TRENDING',
    rating: 5,
    reviewCount: 109,
    category: 'Bags',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=minimal+crossbody+bag',
  },
  {
    id: 'p8',
    name: 'Formal Buckle Belt',
    price: 39,
    badge: 'BESTSELLER',
    rating: 5,
    reviewCount: 82,
    category: 'Belts',
    isBestseller: true,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    href: '/search?q=formal+buckle+belt',
  },
];

export const BRANDS: Brand[] = [
  { id: 'b1', name: 'ZARA' },
  { id: 'b2', name: 'H&M' },
  { id: 'b3', name: 'MANGO' },
  { id: 'b4', name: 'LEVI’S' },
  { id: 'b5', name: 'FOREVER 21' },
  { id: 'b6', name: 'GUCCI' },
  { id: 'b7', name: 'PRADA' },
  { id: 'b8', name: 'FOSSIL' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Style Dresses for Every Occasion',
    excerpt:
      'From casual outings to evening events, discover simple ways to style dresses with the right accessories.',
    date: 'May 26, 2025',
    slug: 'how-to-style-dresses',
    category: 'Fashion Guide',
  },
  {
    id: 'blog-2',
    title: 'Top Fashion Essentials to Add to Your Wardrobe',
    excerpt:
      'Explore must-have clothing, belts, and bags that can upgrade your everyday look with ease.',
    date: 'May 20, 2025',
    slug: 'top-fashion-essentials',
    category: 'Style Tips',
  },
  {
    id: 'blog-3',
    title: 'How to Choose the Perfect Bag for Your Outfit',
    excerpt:
      'Learn how to match handbags, crossbody bags, and everyday bags with different outfits and occasions.',
    date: 'May 14, 2025',
    slug: 'choose-perfect-bag',
    category: 'Accessories',
  },
];
