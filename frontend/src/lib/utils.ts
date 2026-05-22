import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Compose className strings with conditional logic and Tailwind merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price value with currency.
 */
export function formatPrice(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}



export function ensureStartWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}
