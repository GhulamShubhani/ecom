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
import { Check, ShoppingCart, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "./cart-context";
import { cn, createUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Price from "../price";
import { DEFAULT_OPTION } from "@/lib/constants";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";

type MerchandiseSearchParams = {
  [key: string]: string;
};

// ✅ Inline OpenCart so the icon is always white + shows red badge.
// `bump` increments on each add so the key change replays the CSS animation.
function OpenCart({ quantity, bump }: { quantity?: number; bump: number }) {
  return (
    <div data-cart-icon className="relative flex h-5 w-5 items-center justify-center">
      <ShoppingCart
        key={`cart-icon-${bump}`}
        className={cn(
          "h-5 w-5 transition-colors",
          bump > 0 && "animate-cart-shake"
        )}
      />
      {quantity && quantity > 0 ? (
        <span
          key={`cart-badge-${bump}`}
          className={cn(
            "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-champagne text-[10px] font-bold text-brand-night",
            bump > 0 && "animate-cart-bounce"
          )}
        >
          {quantity > 99 ? "99+" : quantity}
        </span>
      ) : null}
    </div>
  );
}

export default function CartModal() {
  const {
    cart,
    updateCartItem,
    isCartOpen,
    openCart,
    closeCart,
    cartToast,
  } = useCart();

  const [bump, setBump] = useState(0);
  const prevQuantityRef = useRef<number | null>(null);

  useEffect(() => {
    if (!cart?.id) {
      createCartAndSetCookie();
    }
  }, [cart?.id]);

  const totalQuantity = cart?.totalQuantity ?? 0;

  useEffect(() => {
    if (prevQuantityRef.current === null) {
      prevQuantityRef.current = totalQuantity;
      return;
    }

    if (totalQuantity > prevQuantityRef.current && !isCartOpen) {
      setBump((value) => value + 1);
    }

    prevQuantityRef.current = totalQuantity;
  }, [totalQuantity, isCartOpen]);

  return (
    <>
      {cartToast ? (
        <div
          role="status"
          aria-live="polite"
          className="animate-toast-in fixed right-6 bottom-6 z-[70] flex items-center gap-3 rounded-2xl border border-brand-clay/30 bg-brand-oatmilk/95 px-4 py-3 shadow-[0_20px_60px_-35px_rgba(74,21,37,0.75)] backdrop-blur"
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              cartToast === "added"
                ? "bg-brand-burgundy text-brand-oatmilk"
                : "bg-brand-sand text-brand-burgundy"
            )}
          >
            {cartToast === "added" ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </span>
          <div className="pr-1">
            <p className="font-jakarta text-sm font-semibold text-brand-burgundy">
              {cartToast === "added" ? "Added to Bag" : "Removed from Bag"}
            </p>
            {cartToast === "added" ? (
              <button
                onClick={openCart}
                className="font-jakarta text-xs text-brand-burgundy/55 transition hover:text-brand-clay"
              >
                View cart →
              </button>
            ) : (
              <p className="font-jakarta text-xs text-brand-burgundy/55">
                Item updated
              </p>
            )}
          </div>
        </div>
      ) : null}

      {/* ✅ Cart trigger button */}
      <button aria-label="Open cart" onClick={openCart} className="nav-icon-btn">
        <OpenCart quantity={cart?.totalQuantity} bump={bump} />
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
            <div className="fixed inset-0 bg-brand-night/45 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          {/* Cart panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 right-0 bottom-0 flex h-full w-full flex-col border-l border-brand-clay/20 bg-brand-oatmilk p-6 text-brand-burgundy shadow-[-30px_0_90px_-60px_rgba(74,21,37,0.85)] md:w-[420px]">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-clay/20 pb-5">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-brand-clay" />
                  <p className="font-cormorant text-3xl font-medium text-brand-burgundy">Your Bag</p>
                  {cart?.totalQuantity ? (
                    <span className="rounded-full bg-brand-champagne px-2 py-0.5 font-jakarta text-xs font-bold text-brand-night">
                      {cart.totalQuantity}
                    </span>
                  ) : null}
                </div>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className="cart-close-btn"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              {/* Empty state */}
              {!cart || cart.lines.length === 0 ? (
                <div className="cart-empty-state flex flex-1 flex-col items-center justify-center gap-4 text-center">
                  <div className="animate-wellness-float relative flex h-20 w-20 items-center justify-center">
                    <span
                      aria-hidden
                      className="animate-wellness-glow absolute inset-0 rounded-full bg-brand-champagne/25"
                    />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brand-clay/20 bg-brand-sand">
                      <ShoppingCart className="h-9 w-9 text-brand-clay" />
                    </div>
                  </div>
                  <p className="cart-empty-item cart-empty-item-delay-1 font-cormorant text-3xl font-medium text-brand-burgundy">
                    Your Bag is Empty
                  </p>
                  <p className="cart-empty-item cart-empty-item-delay-2 font-jakarta text-sm text-brand-burgundy/55">
                    Begin with a considered wardrobe essential.
                  </p>
                  <button
                    onClick={closeCart}
                    className="cart-empty-item cart-empty-item-delay-3 btn-brand-ghost mt-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-panel-body flex h-full flex-col justify-between overflow-hidden">

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
                            className="flex w-full flex-col border-b border-brand-clay/15 py-5"
                          >
                            <div className="flex flex-row gap-3">

                              {/* Product image — ✅ squared, dark border */}
                              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-brand-clay/20 bg-brand-sand">
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
                                  <span className="font-cormorant text-xl font-medium leading-snug text-brand-burgundy transition-colors group-hover:text-brand-clay">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION && (
                                    <p className="mt-1 font-jakarta text-xs text-brand-burgundy/45">
                                      {item.merchandise.title}
                                    </p>
                                  )}
                                </Link>

                                <div className="flex items-center justify-between">
                                  {/* Quantity controls — ✅ dark rounded pill */}
                                  <div className="flex h-8 flex-row items-center rounded-full border border-brand-clay/25 bg-white">
                                    <EditItemQuantityButton
                                      item={item}
                                      type="minus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                    <p className="w-7 text-center font-jakarta text-sm text-brand-burgundy">
                                      {item.quantity}
                                    </p>
                                    <EditItemQuantityButton
                                      item={item}
                                      type="plus"
                                      optimisticUpdate={updateCartItem}
                                    />
                                  </div>

                                  <Price
                                    className="font-jakarta text-sm font-semibold text-brand-burgundy"
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
                  <div className="border-t border-brand-clay/20 pt-5">
                    <div className="space-y-3 font-jakarta text-sm text-brand-burgundy/60">
                      <div className="flex justify-between">
                        <span>Taxes</span>
                        <Price
                          className="text-brand-burgundy"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-brand-burgundy/45">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between border-t border-brand-clay/20 pt-3 text-base font-semibold text-brand-burgundy">
                        <span>Total</span>
                        <Price
                          className="text-brand-burgundy"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </div>
                    </div>

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
      className="btn-brand block w-full disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout →"}
    </button>
  );
}