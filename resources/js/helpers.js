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

/**
 * Russian pluralization.
 *
 * @param n - The number.
 * @param forms - Array of word forms [one, few, many].
 * @param includeNumber - Prepend the number before the word.
 * @returns Formatted string.
 *
 * @example plural(1, ['яблоко', 'яблока', 'яблок']); // "1 яблоко"
 * @example plural(5, ['яблоко', 'яблока', 'яблок']); // "5 яблок"
 * @example plural(2, ['день', 'дня', 'дней'], false); // "дня"
 */
export function plural(n, forms, includeNumber = true) {
  if (!Array.isArray(forms) || forms.length !== 3) {
    throw new Error('Forms array must contain exactly 3 elements');
  }

  const numeric = Number(n);

  if (!Number.isFinite(numeric)) {
    return includeNumber ? `${n} ${forms[2]}` : forms[2];
  }

  const absN = Math.abs(numeric);
  let word;

  if (!Number.isInteger(absN)) {
    // Fractional numbers typically use the genitive singular form (forms[1])
    word = forms[1];
  } else {
    const lastDigit = absN % 10;
    const lastTwoDigits = absN % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      word = forms[0];
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      (lastTwoDigits < 10 || lastTwoDigits >= 20)
    ) {
      word = forms[1];
    } else {
      word = forms[2];
    }
  }

  return includeNumber ? `${numeric} ${word}` : word;
}

/**
 * Truncate a string with a suffix.
 *
 * @param str - Source string.
 * @param length - Maximum length.
 * @param suffix - Truncation suffix.
 * @returns Truncated string.
 *
 * @example truncate('Hello world!', 7); // "Hello…"
 */
export function truncate(str, length, suffix = '…') {
  if (!str || str.length <= length) return str ?? '';
  return str.slice(0, length).trimEnd() + suffix;
}

/**
 * Format a number with locale-aware separators.
 *
 * @param value - Number to format.
 * @param locale - Locale string.
 * @param options - Intl.NumberFormat options.
 * @returns Formatted string.
 *
 * @example formatNumber(1234567); // "1 234 567"
 * @example formatNumber(1234.5, 'ru-RU', { minimumFractionDigits: 2 }); // "1 234,50"
 */
export function formatNumber(value, locale = 'ru-RU', options = {}) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return new Intl.NumberFormat(locale, options).format(numeric);
}

/**
 * Format a monetary amount with currency symbol.
 *
 * @param value - Amount.
 * @param currency - ISO 4217 currency code.
 * @param locale - Locale string.
 * @returns Formatted currency string.
 *
 * @example formatCurrency(2999.9); // "2 999,90 ₽"
 */
export function formatCurrency(value, currency = 'RUB', locale = 'ru-RU') {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numeric);
}

/**
 * Format a date string or Date object.
 *
 * @param date - Date or date string.
 * @param options - Intl.DateTimeFormat options.
 * @param locale - Locale string.
 * @returns Formatted date string.
 *
 * @example formatDate('2026-02-20'); // "20 февр. 2026 г."
 * @example formatDate('2026-02-20', { day: 'numeric', month: 'long' }); // "20 февраля"
 */
export function formatDate(date, options = { dateStyle: 'medium' }, locale = 'ru-RU') {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Copy text to the clipboard.
 *
 * @param text - Text to copy.
 * @returns `true` if successful, `false` otherwise.
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely access nested object properties via dot-notation path.
 *
 * @param obj - Source object.
 * @param path - Dot-notation path, e.g. `'user.address.city'`.
 * @param defaultValue - Fallback value.
 * @returns The value at the path, or `defaultValue`.
 *
 * @example dataGet({ a: { b: 1 } }, 'a.b'); // 1
 * @example dataGet({}, 'a.b', 'fallback'); // "fallback"
 */
export function dataGet(obj, path, defaultValue) {
  if (!obj || !path) return defaultValue;

  const value = path.split('.').reduce((acc, part) => {
    return acc && typeof acc === 'object' ? acc[part] : undefined;
  }, obj);

  return value !== undefined ? value : defaultValue;
}

/**
 * Generate a random ID (UUID v4 if supported, fallback otherwise).
 *
 * @returns Unique identifier string.
 */
export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older runtimes or SSR
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Wait for N milliseconds (for async/await chains).
 *
 * @param ms - Milliseconds to wait.
 * @returns Promise that resolves after the specified time.
 *
 * @example await sleep(500);
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
