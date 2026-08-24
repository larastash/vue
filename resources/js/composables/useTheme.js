import { useThemeStore } from '@/Stores/themeStore';
import { storeToRefs } from 'pinia';

export function useTheme() {
  const store = useThemeStore();

  const { currentTheme, isDark, effectiveTheme } = storeToRefs(store);

  const cycleOrder = ['light', 'dark', 'system'];

  const toggleTheme = () => {
    const idx = cycleOrder.indexOf(store.currentTheme);
    const nextIndex = (idx + 1) % cycleOrder.length;

    store.setTheme(cycleOrder[nextIndex]);
  };

  return {
    currentTheme,
    effectiveTheme,
    isDark,

    toggleTheme,
    setTheme: store.setTheme,
  };
}
