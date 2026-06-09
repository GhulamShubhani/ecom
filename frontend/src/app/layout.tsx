import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeModeScript } from 'flowbite-react';
import { ThemeInit } from '../../.flowbite-react/init';
import { SITE_CONFIG } from '@/constants/site';
import { PRIMARY_NAV } from '@/constants/nav';
import { resolveAudienceMenuPath } from '@/lib/resolve-menu-path';
import { getMenu } from '@/lib/shopify';
import type { NavLink } from '@/types/nav';
import '@/styles/globals.css';


import { CartProvider } from "@/components/cart/cart-context";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import NavigationProgress from '@/components/layout/NavigationProgress';
import ScrollToTopButton from '@/components/layout/scroll-to-top-button';
import AddToCartAnimation from '@/components/cart/add-to-cart-animation';

function mapMenuToNavLinks(
  menu: Awaited<ReturnType<typeof getMenu>>,
  options?: { resolveAudiencePaths?: boolean }
): NavLink[] {
  return menu.map((item) => ({
    label: item.title,
    href: options?.resolveAudiencePaths
      ? resolveAudienceMenuPath(item.path, item.title)
      : item.path,
  }));
}

async function getNavItems(): Promise<NavLink[]> {
  try {
    const menu = await getMenu('main-menu');
    const items = mapMenuToNavLinks(menu);
    // Ensure we always have a Home link even if Shopify menu omits it.
    const hasHome = items.some((i) => i.href === '/');
    return hasHome ? items : [{ label: 'Home', href: '/' }, ...items];
  } catch (error) {
    console.error('Navbar menu fetch failed:', error);
    return PRIMARY_NAV;
  }
}

async function getMobileStickyNavItems(): Promise<NavLink[]> {
  try {
    const menu = await getMenu('mobile-sticky-menu');
    return mapMenuToNavLinks(menu, { resolveAudiencePaths: true });
  } catch (error) {
    console.error('Mobile sticky menu fetch failed:', error);
    return [];
  }
}


const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Intimacy on your terms.`,
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
  const mobileStickyItems = await getMobileStickyNavItems();

  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <ThemeModeScript />
      </head>

      <body className="bg-brand-oatmilk font-jakarta text-brand-night antialiased">
        <ThemeInit />
        <NavigationProgress />
        <CartProvider cartPromise={cart}>
          <Navbar items={navItems} mobileStickyItems={mobileStickyItems} />
          {children}
          <Footer />
          <ScrollToTopButton />
          <AddToCartAnimation />
        </CartProvider>
      </body>
    </html>
  );
}