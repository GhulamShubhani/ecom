// // import Link from 'next/link';

// // const COLUMNS = [
// //   {
// //     title: 'Shop',
// //     links: [
// //       { label: 'New In', href: '/new-in' },
// //       { label: 'Clothing', href: '/clothing' },
// //       { label: 'Denim', href: '/denim' },
// //       { label: 'Accessories', href: '/accessories' },
// //       { label: 'Edits', href: '/edits' },
// //     ],
// //   },
// //   {
// //     title: 'Help',
// //     links: [
// //       { label: 'Customer service', href: '/help' },
// //       { label: 'Shipping', href: '/shipping' },
// //       { label: 'Returns', href: '/returns' },
// //       { label: 'Size guide', href: '/size-guide' },
// //       { label: 'Contact', href: '/contact' },
// //     ],
// //   },
// //   {
// //     title: 'Company',
// //     links: [
// //       { label: 'About', href: '/about' },
// //       { label: 'Stories', href: '/stories' },
// //       { label: 'Stores', href: '/stores' },
// //       { label: 'Careers', href: '/careers' },
// //       { label: 'Sustainability', href: '/sustainability' },
// //     ],
// //   },
// // ] as const;

// // export function Footer() {
// //   return (
// //     <footer className="bg-ink text-cream-50">
// //       <div className="container-page py-16 sm:py-20">
// //         <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
// //           <div className="col-span-2 md:col-span-1">
// //             <Link href="/" className="font-serif text-3xl tracking-wider">
// //               <span className="italic font-light">Playme</span>{' '}
// //               <span className="font-light">Shop</span>
// //             </Link>
// //             <p className="mt-4 max-w-xs text-sm text-cream-50/70">
// //               Timeless silhouettes & soft tailoring designed in Oslo, made in Europe.
// //             </p>
// //           </div>

// //           {COLUMNS.map((col) => (
// //             <div key={col.title}>
// //               <h4 className="text-[11px] uppercase tracking-widest2 text-cream-50/80">
// //                 {col.title}
// //               </h4>
// //               <ul className="mt-5 space-y-3">
// //                 {col.links.map((link) => (
// //                   <li key={link.href}>
// //                     <Link
// //                       href={link.href}
// //                       className="link-underline text-sm text-cream-50/90 hover:text-cream-50"
// //                     >
// //                       {link.label}
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream-50/15 pt-6 text-[11px] uppercase tracking-widest2 text-cream-50/60 md:flex-row md:items-center">
// //           <p>© {new Date().getFullYear()} Playme-shop. All rights reserved.</p>
// //           <div className="flex flex-wrap items-center gap-6">
// //             <Link href="/privacy" className="hover:text-cream-50">Privacy</Link>
// //             <Link href="/terms"   className="hover:text-cream-50">Terms</Link>
// //             <Link href="/cookies" className="hover:text-cream-50">Cookies</Link>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }


// import { getMenu } from "@/lib/shopify";
// import { Menu } from "@/lib/shopify/types";
// import Link from "next/link";

// export  async function Footer() {
//   const menu = await getMenu("footer");
//   return (
//     <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-t-black">
//       <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//         {menu.length > 0 ? (
//           <ul className="hidden gap-6 text-sm md:flex md:items-center">
//             {menu.map((item: Menu) => (
//               <li key={item.title}>
//                 <Link
//                   href={item.path}
//                   prefetch={true}
//                   className="text-gray-700 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
//                 >
//                   {item.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         ) : null}
//       </nav>
//     </footer>
//   );
// }


import Link from 'next/link';
import { Instagram, Music2, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND, FOOTER_COLUMNS, PAYMENT_METHODS } from '@/constants/brand';
import { BrandLockup } from '@/components/brand/brand-lockup';

const socials = [
  { icon: Instagram, href: BRAND.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
  { icon: Music2, href: BRAND.social.tiktok, label: 'TikTok' },
];

export function Footer() {
  return (
    <footer className={cn('border-t border-brand-clay/15 bg-brand-night pt-20 pb-10')}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-2 gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <BrandLockup
              onDark
              showTagline
              wordmarkSize="lg"
              className="mb-5"
            />
            <p className="mb-7 max-w-xs font-jakarta text-sm leading-relaxed text-brand-oatmilk/60">
              {BRAND.description}
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-clay/15 bg-brand-oatmilk/5 text-brand-oatmilk/55 transition-all duration-300 hover:border-brand-clay hover:bg-brand-clay/10 hover:text-brand-clay"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mb-6 font-jakarta text-[11px] font-semibold tracking-[0.32em] text-brand-champagne uppercase">
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="block font-jakarta text-sm text-brand-oatmilk/55 transition-colors hover:text-brand-clay"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-brand-clay/15 pt-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2.5">
            {PAYMENT_METHODS.map((payment) => (
              <span key={payment} className="rounded-full border border-brand-clay/15 bg-brand-oatmilk/5 px-3 py-1 font-jakarta text-[11px] text-brand-oatmilk/55">
                {payment}
              </span>
            ))}
          </div>
          <p className="text-center font-jakarta text-xs text-brand-oatmilk/40">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


