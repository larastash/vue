import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef, watch } from 'vue';
import { toast } from 'vue-sonner';

export interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
  message?: string;
  [key: string]: string | undefined;
}

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'message';

const flashToastMap: Record<string, ToastType> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  message: 'message',
};

export function useFlash() {
  const page = usePage();

  const flash = computed<FlashMessages>(() => {
    return (page.props?.flash as FlashMessages) ?? {};
  });

  const has = (key: string): boolean => {
    const value = flash.value?.[key];
    return value !== undefined && value !== null && value !== '';
  };

  const get = (key: string, defaultValue: string | null = null): string | null => {
    return flash.value?.[key] ?? defaultValue;
  };

  const all = (): FlashMessages => {
    return flash.value;
  };

  const isEmpty = computed<boolean>(() => Object.keys(flash.value).length === 0);

  return {
    flash,
    has,
    get,
    all,
    isEmpty,
  };
}

/**
 * Auto-show toasts from Inertia flash messages.
 *
 * Call once in your app layout — all flash messages from Laravel
 * will automatically appear as toasts.
 *
 * Supports: `success`, `error`, `warning`, `info`, `message`.
 *
 * @example
 * // In your layout:
 * import { useFlashToasts } from '@/composables/useFlash';
 * useFlashToasts();
 *
 * // In a Laravel controller:
 * return back()->with('flash', ['success' => 'Saved!']);
 */
export function useFlashToasts() {
  const page = usePage();

  watch(
    () => page.props?.flash as FlashMessages | undefined,
    (flash) => {
      if (!flash) return;

      // Iterate over known toast keys
      for (const [key, type] of Object.entries(flashToastMap)) {
        const message = flash[key];

        if (!message) continue;

        if (type === 'message') {
          toast(message);
        } else {
          (toast as any)[type](message);
        }
      }
    },
    { immediate: true }
  );
}
