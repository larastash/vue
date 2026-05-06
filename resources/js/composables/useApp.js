import { useAppStore } from '@/stores/appStore';

export function useApp() {
  const store = useAppStore();

  return {
    store,
  };
}
