import { useThemeStore, type Theme } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

export function useTheme() {
  const store = useThemeStore();

  // storeToRefs автоматически выводит типы ref-оберток для state и getters
  const { currentTheme, isDark, effectiveTheme } = storeToRefs(store);

  const cycleOrder: Theme[] = ['light', 'dark', 'system'];

  const toggleTheme = () => {
    // Находим текущий индекс.
    // Так как store.currentTheme имеет тип Theme, он гарантированно есть в массиве.
    const idx = cycleOrder.indexOf(store.currentTheme);

    // Вычисляем следующий индекс с зацикливанием
    const nextIndex = (idx + 1) % cycleOrder.length;

    store.setTheme(cycleOrder[nextIndex]);
  };

  return {
    // Refs
    currentTheme,
    effectiveTheme,
    isDark,

    // Actions/Methods
    toggleTheme,
    setTheme: store.setTheme,
  };
}
