# Camilla Pihl — Next.js Storefront

A production-grade Next.js 14 (App Router) e-commerce landing page inspired by
[camillapihl.com](https://camillapihl.com/). Built with TypeScript, Tailwind CSS,
and a clean, scalable folder structure.

> Images are pulled from Unsplash (royalty free) for demo purposes. Swap with
> your CMS / Shopify / Sanity products in `src/data/products.ts`.

---

## Tech stack

- **Next.js 14** (App Router, RSC)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom theme (cream / sand / ink palette)
- **Lucide Icons**
- **Inter** + **Cormorant Garamond** (Google Fonts via `next/font`)
- **ESLint** + **Prettier** with `prettier-plugin-tailwindcss`

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

Available scripts:

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start dev server with HMR                |
| `npm run build`       | Production build                         |
| `npm run start`       | Start the production server              |
| `npm run lint`        | Run ESLint                               |
| `npm run type-check`  | Run TypeScript without emitting          |
| `npm run format`      | Format `src/**` with Prettier            |

Copy `.env.example` to `.env.local` and fill values as needed.

---

## Folder structure

```
new-ecom/
├── public/                       # Static assets (favicon, og image, etc.)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (fonts, metadata)
│   │   ├── page.tsx              # Home page composition
│   │   ├── loading.tsx           # Global loading UI
│   │   └── not-found.tsx         # 404 page
│   │
│   ├── components/
│   │   ├── layout/               # Header, Footer, AnnouncementBar
│   │   ├── home/                 # Page-specific sections (Hero, OccasionEdit, …)
│   │   └── product/              # ProductCard, ProductCarousel
│   │
│   ├── constants/                # Static config (site, nav, announcements)
│   ├── data/                     # Seed data (products, editorial images)
│   ├── hooks/                    # Reusable React hooks
│   ├── lib/                      # Utilities (cn, formatPrice, …)
│   ├── styles/                   # globals.css (Tailwind + custom layers)
│   └── types/                    # Shared TypeScript types
│
├── .eslintrc.json
├── .prettierrc
├── next.config.mjs               # Image remote patterns, etc.
├── postcss.config.mjs
├── tailwind.config.ts            # Custom theme: colors, fonts, animations
└── tsconfig.json                 # Path aliases (@/*, @/components/*, …)
```

---

## Path aliases

Configured in `tsconfig.json`:

```ts
import { Header }    from '@/components/layout/Header';
import { cn }        from '@/lib/utils';
import type { Product } from '@/types/product';
```

Available aliases:

- `@/*`            → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*`        → `src/lib/*`
- `@/hooks/*`      → `src/hooks/*`
- `@/types/*`      → `src/types/*`
- `@/data/*`       → `src/data/*`
- `@/constants/*`  → `src/constants/*`
- `@/styles/*`     → `src/styles/*`

---

## Landing page sections

Mapped 1:1 from camillapihl.com:

1. **AnnouncementBar** — looping marquee tape with offers
2. **Header** — sticky nav, centered wordmark, search/account/wishlist/cart
3. **Hero** — split layout, "dressed for SUMMER OCCASIONS"
4. **OccasionEdit** — horizontal product carousel
5. **FroyaJuliana** — editorial split + product carousel
6. **May17Outfits** — reversed editorial split + carousel
7. **PihlDenim** — full-bleed denim banner + denim favourites
8. **DenimGuideEssentials** — 2-column editorial CTA grid
9. **Newsletter** — pill-style email subscribe
10. **Footer** — dark, multi-column

---

## Customizing

- **Brand palette** → `tailwind.config.ts` → `theme.extend.colors`
- **Typography** → `src/app/layout.tsx` (swap `Cormorant_Garamond` for the brand font)
- **Products** → `src/data/products.ts`
- **Navigation** → `src/constants/nav.ts`
- **Site metadata** → `src/constants/site.ts` and `src/app/layout.tsx`

---

## Production checklist

- [ ] Replace Unsplash images with real product photography
- [ ] Connect a commerce backend (Shopify, Medusa, Sanity, etc.)
- [ ] Add product detail (`/product/[slug]`) and collection (`/products/[slug]`) pages
- [ ] Implement cart state (Zustand / Context / Server actions)
- [ ] Add analytics (Vercel Analytics / Plausible)
- [ ] Configure `metadataBase` and add a real `og.jpg`
