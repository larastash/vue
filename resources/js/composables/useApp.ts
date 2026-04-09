import { useAppStore } from '@/stores/appStore';
import type { Store } from 'pinia';

type AppStore = ReturnType<typeof useAppStore>;

export function useApp() {
  const store = useAppStore();

  return {
    store,
  };
}
