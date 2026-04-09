import { dataGet } from '@/lib/helpers';
import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef } from 'vue';

export interface User {
  id: number | string;
  name?: string;
  email?: string;
  email_verified_at?: string | null;
  roles?: string[];
  permissions?: string[];
  [key: string]: any;
}

type UserComparable = Pick<User, 'id'> | null | undefined;

export function useUser() {
  const page = usePage();

  const user = computed<User | null>(() => {
    const props = page.props as any;
    return props?.auth?.user ?? props?.user ?? null;
  });

  const id = computed<number | string | null>(() => user.value?.id ?? null);

  const isEmailVerified = computed<boolean>(() => Boolean(user.value?.email_verified_at));

  const isAuthenticated = computed<boolean>(() => Boolean(user.value));

  const isGuest = computed<boolean>(() => !user.value);

  // initials is a function (not computed) since it accepts a length argument
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

  /** Get a nested user field via dot-notation path. */
  const get = <T = unknown>(path: string, defaultValue: T | null = null): T | null => {
    return (dataGet(user.value, path, defaultValue) ?? null) as T | null;
  };

  const has = (path: string): boolean => {
    return dataGet(user.value, path) != null;
  };

  const roles = computed<string[]>(() => user.value?.roles ?? []);
  const permissions = computed<string[]>(() => user.value?.permissions ?? []);

  // args.flat() normalizes both single strings and arrays for role checks
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
