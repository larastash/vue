import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines `clsx` for conditional classes and `tailwind-merge` for deduplication.
 *
 * @example cn('px-2 py-1', condition && 'px-4') // "py-1 px-4"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
