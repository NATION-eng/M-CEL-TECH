import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Rounds a computed number (typically from Math.sin/cos) to a fixed
 * precision before it's rendered into markup. Math.sin/cos aren't
 * guaranteed bit-identical across platforms per the ECMAScript spec —
 * Node's SSR render and the browser's hydration render can produce
 * strings that differ in the last few digits (e.g. "21.786307889961293"
 * vs "21.7863"), which React treats as a hydration mismatch. Rounding
 * to 4 decimal places before formatting guarantees the server and
 * client always agree.
 */
export function roundForSSR(value: number, decimals = 4): number {
  return parseFloat(value.toFixed(decimals));
}
