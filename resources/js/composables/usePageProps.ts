import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef } from 'vue';

// Базовый тип для пропсов Inertia.
// Можно расширить его глобально или передавать конкретный интерфейс в usePage<YourInterface>()
type PageProps = Record<string, any>;

export function usePageProps() {
  const page = usePage();

  // Приводим props к известному нам типу (объект)
  const props = computed<PageProps>(() => page.props as PageProps ?? {});

  /**
   * Получение конкретного свойства как реактивного вычисляемого значения (ComputedRef).
   *
   * @param key Ключ свойства.
   * @param defaultValue Значение по умолчанию.
   * @returns ComputedRef со значением свойства.
   *
   * @example
   * const appName = prop('appName', 'Laravel');
   * console.log(appName.value); // Реактивное значение
   */
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
