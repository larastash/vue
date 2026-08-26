import { useAppStore } from '@js/Stores/appStore';

export function useApp() {
  const store = useAppStore();

  return {
    store,
  };
}
