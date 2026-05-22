// import Link from 'next/link';

// const COLUMNS = [
//   {
//     title: 'Shop',
//     links: [
//       { label: 'New In', href: '/new-in' },
//       { label: 'Clothing', href: '/clothing' },
//       { label: 'Denim', href: '/denim' },
//       { label: 'Accessories', href: '/accessories' },
//       { label: 'Edits', href: '/edits' },
//     ],
//   },
//   {
//     title: 'Help',
//     links: [
//       { label: 'Customer service', href: '/help' },
//       { label: 'Shipping', href: '/shipping' },
//       { label: 'Returns', href: '/returns' },
//       { label: 'Size guide', href: '/size-guide' },
//       { label: 'Contact', href: '/contact' },
//     ],
//   },
//   {
//     title: 'Company',
//     links: [
//       { label: 'About', href: '/about' },
//       { label: 'Stories', href: '/stories' },
//       { label: 'Stores', href: '/stores' },
//       { label: 'Careers', href: '/careers' },
//       { label: 'Sustainability', href: '/sustainability' },
//     ],
//   },
// ] as const;

// export function Footer() {
//   return (
//     <footer className="bg-ink text-cream-50">
//       <div className="container-page py-16 sm:py-20">
//         <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
//           <div className="col-span-2 md:col-span-1">
//             <Link href="/" className="font-serif text-3xl tracking-wider">
//               <span className="italic font-light">Playme</span>{' '}
//               <span className="font-light">Shop</span>
//             </Link>
//             <p className="mt-4 max-w-xs text-sm text-cream-50/70">
//               Timeless silhouettes & soft tailoring designed in Oslo, made in Europe.
//             </p>
//           </div>

//           {COLUMNS.map((col) => (
//             <div key={col.title}>
//               <h4 className="text-[11px] uppercase tracking-widest2 text-cream-50/80">
//                 {col.title}
//               </h4>
//               <ul className="mt-5 space-y-3">
//                 {col.links.map((link) => (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className="link-underline text-sm text-cream-50/90 hover:text-cream-50"
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream-50/15 pt-6 text-[11px] uppercase tracking-widest2 text-cream-50/60 md:flex-row md:items-center">
//           <p>© {new Date().getFullYear()} Playme-shop. All rights reserved.</p>
//           <div className="flex flex-wrap items-center gap-6">
//             <Link href="/privacy" className="hover:text-cream-50">Privacy</Link>
//             <Link href="/terms"   className="hover:text-cream-50">Terms</Link>
//             <Link href="/cookies" className="hover:text-cream-50">Cookies</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import { getMenu } from "@/lib/shopify";
import { Menu } from "@/lib/shopify/types";
import Link from "next/link";

export  async function Footer() {
  const menu = await getMenu("footer");
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:border-t-black">
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {menu.length > 0 ? (
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="text-gray-700 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </footer>
  );
}
