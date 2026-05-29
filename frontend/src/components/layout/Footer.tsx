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
import { Instagram, MessageCircle, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const helpLinks = ['Contact Us', 'Discreet Delivery', 'Returns & Refunds', 'FAQ', 'Track Order'];
const shopLinks = ['For Winter', 'For Summer', 'For Kids', 'New Arrivals', 'Sale', 'All Products'];
const companyLinks = ['About Us', 'Blog', 'Press', 'Privacy Policy', 'Terms & Conditions', 'Cookie Policy'];
const payments = ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'BNPL'];

export function Footer() {
  return (
    <footer className={cn('border-t-2 border-brand-red/40 bg-[#0d0d0d] pt-16 pb-8')}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <p className="font-heading mb-3 text-2xl text-white">APNA DUKAN</p>
            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              Premium fashion essentials designed for style, comfort, and everyday confidence.
            </p>
            <div className="flex gap-2">
              {[Instagram, Youtube, MessageCircle].map((Icon, idx) => (
                <button
                  key={`social-${idx}`}
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-charcoal text-gray-400 transition hover:bg-brand-red/10 hover:text-brand-red"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Help</p>
            {helpLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Shop</p>
            {shopLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-white uppercase">Company</p>
            {companyLinks.map((link) => (
              <Link key={link} href="/search" className="mb-2 block text-sm text-gray-500 transition hover:text-brand-red">
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-gray pt-8 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {payments.map((payment) => (
              <span key={payment} className="rounded-full bg-brand-charcoal px-3 py-1 text-xs text-gray-400">
                {payment}
              </span>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600">
            © 2025 VELVETLUX. All rights reserved. For adults 18+ only. All models 18+ at time of photography.
          </p>
        </div>
      </div>
    </footer>
  );
}


