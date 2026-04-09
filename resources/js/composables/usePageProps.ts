import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef } from 'vue';

type PageProps = Record<string, any>;

export function usePageProps() {
  const page = usePage();

  // Cast props to a known type (object)
  const props = computed<PageProps>(() => page.props as PageProps ?? {});

  const prop = <T = any>(key: string, defaultValue?: T): ComputedRef<T | null> => {
    return computed(() => {
      const val = (page.props as PageProps)?.[key];
      return (val !== undefined && val !== null ? val : defaultValue) as T | null;
    });
  };

  return {
    props,
    prop,
  };
}
