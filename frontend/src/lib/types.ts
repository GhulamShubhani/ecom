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
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: string;
}

export interface Brand {
  id: string;
  name: string;
}
