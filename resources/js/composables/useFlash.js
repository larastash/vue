import { usePage } from '@inertiajs/vue3';
import { computed, watch } from 'vue';
import { toast } from 'vue-sonner';

const flashToastMap = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  message: 'message',
};

export function useFlash() {
  const page = usePage();

  const flash = computed(() => {
    return page.props?.flash ?? {};
  });

  const has = (key) => {
    const value = flash.value?.[key];
    return value !== undefined && value !== null && value !== '';
  };

  const get = (key, defaultValue = null) => {
    return flash.value?.[key] ?? defaultValue;
  };

  const all = () => {
    return flash.value;
  };

  const isEmpty = computed(() => Object.keys(flash.value).length === 0);

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
    () => page.props?.flash,
    (flash) => {
      if (!flash) return;

      // Iterate over known toast keys
      for (const [key, type] of Object.entries(flashToastMap)) {
        const message = flash[key];

        if (!message) continue;

        if (type === 'message') {
          toast(message);
        } else {
          toast[type](message);
        }
      }
    },
    { immediate: true }
  );
}
