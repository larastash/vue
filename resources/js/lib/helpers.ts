/**
 * Русская плюрализация.
 *
 * @param n — число.
 * @param forms — массив форм [один, два, много].
 * @param includeNumber — подставить число перед словом.
 * @returns Отформатированная строка.
 *
 * @example plural(1, ['яблоко', 'яблока', 'яблок']); // "1 яблоко"
 * @example plural(5, ['яблоко', 'яблока', 'яблок']); // "5 яблок"
 * @example plural(2, ['день', 'дня', 'дней'], false); // "дня"
 */
export function plural(
  n: number,
  forms: [string, string, string],
  includeNumber = true
): string {
  if (!Array.isArray(forms) || forms.length !== 3) {
    throw new Error('Forms array must contain exactly 3 elements');
  }

  const numeric = Number(n);

  if (!Number.isFinite(numeric)) {
    return includeNumber ? `${n} ${forms[2]}` : forms[2];
  }

  const absN = Math.abs(numeric);
  let word: string;

  if (!Number.isInteger(absN)) {
    // Для дробных чисел обычно используется средняя форма (генитив единственного числа)
    // например: 1.5 яблока, но иногда может требоваться другая логика в зависимости от ТЗ.
    // Здесь оставлена логика из оригинала (forms[1]).
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
 * Обрезка строки с троеточием.
 *
 * @param str Исходная строка.
 * @param length Максимальная длина.
 * @param suffix Суффикс обрезки.
 * @returns Обрезанная строка.
 *
 * @example truncate('Привет мир!', 7); // "Привет…"
 */
export function truncate(
  str: string | null | undefined,
  length: number,
  suffix = '…'
): string {
  if (!str || str.length <= length) return str ?? '';
  return str.slice(0, length).trimEnd() + suffix;
}

/**
 * Форматирование числа с разделителями разрядов.
 *
 * @param value Число для форматирования.
 * @param locale Локаль.
 * @param options Опции Intl.NumberFormat.
 * @returns Отформатированная строка.
 *
 * @example formatNumber(1234567); // "1 234 567"
 * @example formatNumber(1234.5, 'ru-RU', { minimumFractionDigits: 2 }); // "1 234,50"
 */
export function formatNumber(
  value: number,
  locale = 'ru-RU',
  options: Intl.NumberFormatOptions = {}
): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return new Intl.NumberFormat(locale, options).format(numeric);
}

/**
 * Форматирование цены (денежная сумма).
 *
 * @param value Сумма.
 * @param currency Код валюты (ISO 4217).
 * @param locale Локаль.
 * @returns Отформатированная строка с валютой.
 *
 * @example formatCurrency(2999.9); // "2 999,90 ₽"
 */
export function formatCurrency(
  value: number,
  currency = 'RUB',
  locale = 'ru-RU'
): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numeric);
}

/**
 * Форматирование даты.
 *
 * @param date Дата или строка даты.
 * @param options Опции Intl.DateTimeFormat.
 * @param locale Локаль.
 * @returns Отформатированная дата.
 *
 * @example formatDate('2026-02-20'); // "20 февр. 2026 г."
 * @example formatDate('2026-02-20', { day: 'numeric', month: 'long' }); // "20 февраля"
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
  locale = 'ru-RU'
): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Копирование текста в буфер обмена.
 *
 * @param text Текст для копирования.
 * @returns true, если успешно, иначе false.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Безопасный доступ к вложенным свойствам через точечную нотацию.
 *
 * @template T Тип возвращаемого значения (или defaultValue).
 * @param obj Объект.
 * @param path Путь, например 'user.address.city'.
 * @param defaultValue Значение по умолчанию.
 * @returns Значение свойства или defaultValue.
 *
 * @example dataGet({ a: { b: 1 } }, 'a.b'); // 1
 * @example dataGet({}, 'a.b', 'fallback'); // "fallback"
 */
export function dataGet<T = unknown>(
  obj: Record<string, any> | null | undefined,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || !path) return defaultValue;

  const value = path.split('.').reduce<any>((acc, part) => {
    return acc && typeof acc === 'object' ? acc[part] : undefined;
  }, obj);

  return value !== undefined ? value : defaultValue;
}

/**
 * Генерация случайного ID (UUID v4 если поддерживается, иначе fallback).
 *
 * @returns Уникальный идентификатор.
 */
export function uid(): string {
  // Проверка наличия crypto.randomUUID
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback для старых сред или SSR (если crypto не доступен глобально)
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Ожидание N миллисекунд (для async/await цепочек).
 *
 * @param ms Количество миллисекунд.
 * @returns Промис, который резолвится через указанное время.
 *
 * @example await sleep(500);
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
