import { useThemeStore, type Theme } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';

export function useTheme() {
  const store = useThemeStore();

  const { currentTheme, isDark, effectiveTheme } = storeToRefs(store);

  const cycleOrder: Theme[] = ['light', 'dark', 'system'];

  /** Toggle to the next theme in the cycle: light → dark → system. */
  const toggleTheme = () => {
    const idx = cycleOrder.indexOf(store.currentTheme);
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
