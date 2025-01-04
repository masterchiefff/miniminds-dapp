import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and merges Tailwind classes.
 * @param inputs - Array of class names or conditional objects.
 * @returns A single string with the merged class names.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
