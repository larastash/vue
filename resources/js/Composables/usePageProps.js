import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function usePageProps() {
  const page = usePage();

  const props = computed(() => page.props ?? {});

  const prop = (key, defaultValue) => {
    return computed(() => {
      const val = page.props?.[key];
      return val !== undefined && val !== null ? val : defaultValue ?? null;
    });
  };

  return {
    props,
    prop,
  };
}
