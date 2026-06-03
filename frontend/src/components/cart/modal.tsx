// "use client";

// import { Dialog, Transition } from "@headlessui/react";
// import { ShoppingCart } from "lucide-react";
// import { Fragment, useEffect } from "react";
// import { useCart } from "./cart-context";
// import { createUrl } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import Price from "../price";
// import OpenCart from "./open-cart";
// import CloseCart from "./close-cart";
// import { DEFAULT_OPTION } from "@/lib/constants";
// import { DeleteItemButton } from "./delete-item-button";
// import { EditItemQuantityButton } from "./edit-item-quantity-button";
// import { useFormStatus } from "react-dom";
// import LoadingDots from "../loading-dots";
// import { createCartAndSetCookie, redirectToCheckout } from "./actions";

// type MerchandiseSearchParams = {
//   [key: string]: string;
// };

// export default function CartModal() {
//   const { cart, updateCartItem, isCartOpen, openCart, closeCart } = useCart();

//   useEffect(() => {
//     if (!cart?.id) {
//       createCartAndSetCookie();
//     }
//   }, [cart?.id]);

//   return (
//     <>
//       <button aria-label="Open cart" onClick={openCart}>
//         <OpenCart quantity={cart?.totalQuantity} />
//       </button>
//       <Transition show={isCartOpen}>
//         <Dialog onClose={closeCart} className="relative z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="opacity-0 backdrop-blur-none"
//             enterTo="opacity-100 backdrop-blur-[.5px]"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="opacity-100 backdrop-blur-[.5px]"
//             leaveTo="opacity-0 backdrop-blur-none"
//           >
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//           </Transition.Child>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-full"
//           >
//             <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-semibold">My Cart</p>
//                 <button aria-label="Close cart" onClick={closeCart}>
//                   <CloseCart />
//                 </button>
//               </div>

//               {!cart || cart.lines.length === 0 ? (
//                 <div>
//                   <ShoppingCart className="h-16" />
//                   <p className="mt-6 text-center text-2xl font-bold">
//                     Your Cart is Empty.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="flex h-full flex-col justify-between overflow-hidden p-1">
//                   <ul className="flex-grow overflow-auto py-4">
//                     {cart.lines
//                       .sort((a, b) =>
//                         a.merchandise.product.title.localeCompare(
//                           b.merchandise.product.title
//                         )
//                       )
//                       .map((item, i) => {
//                         const merchandiseSearchParams =
//                           {} as MerchandiseSearchParams;

//                         item.merchandise.selectedOptions.forEach(
//                           ({ name, value }) => {
//                             if (value !== DEFAULT_OPTION) {
//                               merchandiseSearchParams[
//                                 name.toLocaleLowerCase()
//                               ] = value;
//                             }
//                           }
//                         );
//                         const merchandiseUrl = createUrl(
//                           `/product/${item.merchandise.product.handle}`,
//                           new URLSearchParams(merchandiseSearchParams)
//                         );

//                         return (
//                           <li
//                             key={i}
//                             className="lex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
//                           >
//                             <div className="relative flex w-full flex-row justify-between px-1 py-4">
//                               <DeleteItemButton
//                                 item={item}
//                                 optimisticUpdate={updateCartItem}
//                               />
//                             </div>
//                             <div className="flex flex-row">
//                               <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
//                                 <Image
//                                   className="h-full w-full object-cover"
//                                   width={64}
//                                   height={64}
//                                   alt={
//                                     item.merchandise.product.featuredImage
//                                       .altText || item.merchandise.product.title
//                                   }
//                                   src={
//                                     item.merchandise.product.featuredImage.url
//                                   }
//                                 />
//                               </div>
//                               <Link
//                                 href={merchandiseUrl}
//                                 onClick={closeCart}
//                                 className="z-30 ml-2 flex flex-row space-x-4"
//                               >
//                                 <div className="flex flex-1 flex-col text-base">
//                                   <span className="leading-tight">
//                                     {item.merchandise.product.title}
//                                   </span>
//                                   {item.merchandise.title !== DEFAULT_OPTION ? (
//                                     <p className="text-sm text-neutral-500 dark:text-neutral-400">
//                                       {item.merchandise.title}
//                                     </p>
//                                   ) : null}
//                                 </div>
//                               </Link>
//                             </div>
//                             <div className="flex h-16 flex-col justify-between">
//                               <Price
//                                 className="flex justify-end space-y-2 text-right text-sm"
//                                 amount={item.cost.totalAmount.amount}
//                                 currencyCode={
//                                   item.cost.totalAmount.currencyCode
//                                 }
//                               />
//                               <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
//                                 <EditItemQuantityButton
//                                   item={item}
//                                   type="minus"
//                                   optimisticUpdate={updateCartItem}
//                                 />
//                                 <p className="w-6 text-center">
//                                   <span className="w-full text-sm">
//                                     {item.quantity}
//                                   </span>
//                                 </p>
//                                 <EditItemQuantityButton
//                                   item={item}
//                                   type="plus"
//                                   optimisticUpdate={updateCartItem}
//                                 />
//                               </div>
//                             </div>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                   <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
//                       <p>Taxes</p>
//                       <Price
//                         className="text-right text-base text-black dark:text-white"
//                         amount={cart.cost.totalTaxAmount.amount}
//                         currencyCode={cart.cost.totalTaxAmount.currencyCode}
//                       />
//                     </div>
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
//                       <p>Shipping</p>
//                       <p className="text-right">Calculated at checkout</p>
//                     </div>
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
//                       <p>Total</p>
//                       <Price
//                         className="text-right text-base text-black dark:text-white"
//                         amount={cart.cost.totalAmount.amount}
//                         currencyCode={cart.cost.totalAmount.currencyCode}
//                       />
//                     </div>
//                   </div>
//                   <form action={redirectToCheckout}>
//                     <CheckoutButton />
//                   </form>
//                 </div>
//               )}
//             </Dialog.Panel>
//           </Transition.Child>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

// function CheckoutButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
//       type="submit"
//       disabled={pending}
//     >
//       {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
//     </button>
//   );
// }


"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCart, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useCart } from "./cart-context";
import { createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import CloseCart from "./close-cart";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";

type MerchandiseSearchParams = {
  [key: string]: string;
};

// ✅ Inline OpenCart so the icon is always white + shows red badge
function OpenCart({ quantity }: { quantity?: number }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center">
      {/* White cart icon — visible on black navbar */}
      <ShoppingCart className="h-6 w-6 text-white transition-colors hover:text-red-500" />
      {/* Red quantity badge */}
      {quantity && quantity > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {quantity > 99 ? "99+" : quantity}
        </span>
      ) : null}
    </div>
  );
}

export default function CartModal() {
  const { cart, updateCartItem, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    if (!cart?.id) {
      createCartAndSetCookie();
    }
  }, [cart?.id]);

  return (
    <>
      {/* ✅ Cart trigger button */}
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>

      <Transition show={isCartOpen}>
        <Dialog onClose={closeCart} className="relative z-50">

          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          {/* ✅ Cart panel — always dark, red accent border */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l-2 border-red-600/40 bg-[#0a0a0a] p-6 text-white md:w-[400px]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-red-500" />
                  <p className="text-lg font-semibold text-white">Your Bag</p>
                  {cart?.totalQuantity ? (
                    <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                      {cart.totalQuantity}
                    </span>
                  ) : null}
                </div>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition hover:border-red-500 hover:text-white"
                >
                  {/* ✅ Inline close — no dependency on CloseCart component color */}
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Empty state */}
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900">
                    <ShoppingCart className="h-9 w-9 text-neutral-600" />
                  </div>
                  <p className="text-xl font-bold text-white">Your Cart is Empty</p>
                  <p className="text-sm text-neutral-400 max-w-[220px] leading-relaxed">
                    Your next favourite look is waiting — start shopping.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 rounded-full border border-brand-red px-6 py-2 text-sm font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    Explore the Collection
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">

                  {/* Cart line items */}
                  <ul className="flex-grow overflow-auto py-4 pr-1">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title
                        )
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams = {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLocaleLowerCase()] = value;
                          }
                        });

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams)
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-800 py-4"
                          >
                            <div className="flex flex-row gap-3">

                              {/* Product image — ✅ squared, dark border */}
                              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={80}
                                  height={80}
                                  alt={
                                    item.merchandise.product.featuredImage?.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>

                              {/* Product info */}
                              <div className="flex flex-1 flex-col justify-between">
                                <Link
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="group"
                                >
                                  <span className="text-sm font-medium leading-snug text-white group-hover:text-red-400 transition-colors">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION && (
                                    <p className="mt-0.5 text-xs text-neutral-500">
                                      {item.merchandise.title}
                                    </p>
                                  )}
                                </Link>

                                <div className="flex items-center justify-between">
                                  {/* Quantity controls — ✅ dark rounded pill */}
                                  <div className="flex h-8 flex-row items-center rounded-full border border-neutral-700 bg-neutral-900">
                                    <EditItemQuantityButton
                                      item={item}
                                      type="minus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                    <p className="w-7 text-center text-sm text-white">
                                      {item.quantity}
                                    </p>
                                    <EditItemQuantityButton
                                      item={item}
                                      type="plus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>

                                  <Price
                                    className="text-sm font-semibold text-white"
                                    amount={item.cost.totalAmount.amount}
                                    currencyCode={item.cost.totalAmount.currencyCode}
                                  />
                                </div>
                              </div>

                              {/* Delete button */}
                              <DeleteItemButton
                                item={item}
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </li>
                        );
                      })}
                  </ul>

                  {/* Totals + checkout */}
                  <div className="border-t border-neutral-800 pt-4">
                    <div className="space-y-2 text-sm text-neutral-400">
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <Price
                          className="text-white"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-neutral-400">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between border-t border-neutral-800 pt-2 text-base font-semibold text-white">
                        <span>Total</span>
                        <Price
                          className="text-white"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </div>
                    </div>

                    {/* ✅ Red checkout button */}
                    <form action={redirectToCheckout} className="mt-4">
                      <CheckoutButton />
                    </form>
                  </div>

                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-red-600 p-3 text-center text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Complete Your Look →"}
    </button>
  );
}