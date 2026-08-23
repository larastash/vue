import { dataGet } from '@/helpers';
import { usePage } from '@inertiajs/vue3';
import { computed, reactive } from 'vue';

export function useUser() {
  const page = usePage();

  const data = computed(() => {
    const props = page.props;
    return props?.auth?.user ?? props?.user ?? null;
  });

  const id = computed(() => data.value?.id ?? null);
  const isEmailVerified = computed(() => Boolean(data.value?.email_verified_at));
  const isAuthenticated = computed(() => Boolean(data.value));
  const isGuest = computed(() => !data.value);
  const roles = computed(() => data.value?.roles ?? []);
  const permissions = computed(() => data.value?.permissions ?? []);

  const initials = (length = 2) => {
    const name = data.value?.name;
    if (!name) return null;
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, length);
  };

  const get = (path, defaultValue = null) =>
    dataGet(data.value, path, defaultValue) ?? null;

  const has = (path) =>
    dataGet(data.value, path) != null;

  const hasRole = (...args) =>
    args.flat().some((r) => roles.value.includes(r));

  const hasAnyRole = (...args) =>
    args.flat().some((r) => roles.value.includes(r));

  const hasAllRoles = (...args) =>
    args.flat().every((r) => roles.value.includes(r));

  const can = (permission) =>
    permissions.value.includes(permission);

  const cannot = (permission) => !can(permission);

  const is = (otherUser) =>
    id.value != null && id.value === otherUser?.id;

  const isNot = (otherUser) => !is(otherUser);

  return reactive({
    data,
    id,
    isEmailVerified,
    isAuthenticated,
    isGuest,
    roles,
    permissions,
    initials,
    get,
    has,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    can,
    cannot,
    is,
    isNot,
  });
}
