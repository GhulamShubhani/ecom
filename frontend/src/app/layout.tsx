import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../../.flowbite-react/init';
import { SITE_CONFIG } from '@/constants/site';
import { PRIMARY_NAV } from '@/constants/nav';
import { getMenu } from '@/lib/shopify';
import type { NavLink } from '@/types/nav';
import '@/styles/globals.css';


import { CartProvider } from "@/components/cart/cart-context";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer/Footer';

async function getNavItems(): Promise<NavLink[]> {
  try {
    const menu = await getMenu('main-menu');
    const items = menu.map((item) => ({
      label: item.title,
      href: item.path,
    }));
    // Ensure we always have a Home link even if Shopify menu omits it.
    const hasHome = items.some((i) => i.href === '/');
    return hasHome ? items : [{ label: 'Home', href: '/' }, ...items];
  } catch (error) {
    console.error('Navbar menu fetch failed:', error);
    return PRIMARY_NAV;
  }
}


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Timeless silhouettes & soft tailoring`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const cart = getCart(cartId);
  const navItems = await getNavItems();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <ThemeModeScript />
      </head>

      <body className="bg-cream-50 text-ink antialiased dark:bg-gray-900 dark:text-gray-100">
        <ThemeInit />
        <CartProvider cartPromise={cart}>
          <Navbar items={navItems} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}