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

  const initials = (length = 2) => {
    const name = data.value?.name;
    if (!name) return null;
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, length);
  };

  const get = (path, defaultValue = null) =>
    dataGet(data.value, path, defaultValue) ?? null;

  const set = (key, value) => {
    data.value[key] = value;
  };

  const unset = (key) => {
    delete data.value[key];
  };

  const has = (path) =>
    dataGet(data.value, path) != null;

  const is = (otherUser) =>
    id.value != null && id.value === otherUser?.id;

  const isNot = (otherUser) => !is(otherUser);

  return reactive({
    data,
    id,
    isEmailVerified,
    isAuthenticated,
    isGuest,
    initials,
    get,
    set,
    unset,
    has,
    is,
    isNot,
  });
}
