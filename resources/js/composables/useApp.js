import { useAppStore } from '@/Stores/appStore';

export function useApp() {
  const store = useAppStore();

  return {
    store,
  };
}
