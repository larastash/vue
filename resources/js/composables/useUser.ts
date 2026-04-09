import { dataGet } from '@/lib/helpers';
import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef } from 'vue';

// 1. Описываем интерфейс Пользователя
// Расширьте этот интерфейс полями из вашей БД (name, email, avatar и т.д.)
export interface User {
  id: number | string;
  name?: string;
  email?: string;
  email_verified_at?: string | null;
  roles?: string[];
  permissions?: string[];
  [key: string]: any; // Для поддержки динамических полей через dataGet
}

// Тип для аргумента otherUser в методах is/isNot
type UserComparable = Pick<User, 'id'> | null | undefined;

export function useUser() {
  const page = usePage();

  // Приводим props к типу, где есть auth или user
  // Inertia часто кладет пользователя в page.props.auth.user или просто page.props.user
  const user = computed<User | null>(() => {
    const props = page.props as any; // Используем any для гибкости, так как структура props может варьироваться
    return props?.auth?.user ?? props?.user ?? null;
  });

  const id = computed<number | string | null>(() => user.value?.id ?? null);

  const isEmailVerified = computed<boolean>(() => Boolean(user.value?.email_verified_at));

  const isAuthenticated = computed<boolean>(() => Boolean(user.value));

  const isGuest = computed<boolean>(() => !user.value);

  // initials теперь тоже computed, чтобы реагировать на изменения имени,
  // или можно оставить функцией, если имя не меняется реактивно.
  // Здесь оставлено как функция, принимающая аргумент, но с безопасным доступом.
  const initials = (length = 2): string | null => {
    const name = user.value?.name;
    if (!name) return null;

    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, length);
  };

  // T по умолчанию any, но лучше использовать unknown для безопасности,
  // если вы не уверены в типе данных по пути
  const get = <T = unknown>(path: string, defaultValue: T | null = null): T | null => {
    // dataGet может вернуть undefined, поэтому используем ?? null для соответствия типу возврата
    return (dataGet(user.value, path, defaultValue) ?? null) as T | null;
  };

  const has = (path: string): boolean => {
    return dataGet(user.value, path) != null;
  };

  const roles = computed<string[]>(() => user.value?.roles ?? []);
  const permissions = computed<string[]>(() => user.value?.permissions ?? []);

  // args.flat() может содержать любые типы, поэтому приводим к string[] для безопасности сравнения
  const hasRole = (...args: (string | string[])[]): boolean =>
    args.flat().some((r) => roles.value.includes(r));

  const hasAnyRole = (...args: (string | string[])[]): boolean =>
    args.flat().some((r) => roles.value.includes(r));

  const hasAllRoles = (...args: (string | string[])[]): boolean =>
    args.flat().every((r) => roles.value.includes(r));

  const can = (permission: string): boolean =>
    permissions.value.includes(permission);

  const cannot = (permission: string): boolean =>
    !can(permission);

  const is = (otherUser: UserComparable): boolean =>
    id.value != null && id.value === otherUser?.id;

  const isNot = (otherUser: UserComparable): boolean =>
    !is(otherUser);

  return {
    id,
    user,
    initials,
    isEmailVerified,
    isAuthenticated,
    isGuest,
    get,
    has,
    roles,
    permissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    can,
    cannot,
    is,
    isNot,
  };
}
