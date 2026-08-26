import { usePage } from '@inertiajs/vue3';
import { computed, nextTick, reactive, watch } from 'vue';
import { toast } from 'vue-sonner';

export function useFlash() {
  const page = usePage();

  const data = computed(() => page.flash ?? {});

  const isEmpty = computed(() => Object.keys(data.value).length === 0);

  const has = (key) => {
    const value = data.value?.[key];
    return value !== undefined && value !== null && value !== '';
  };

  const get = (key, defaultValue = null) =>
    data.value?.[key] ?? defaultValue;

  const all = () => data.value;

  return reactive({
    data,
    isEmpty,
    has,
    get,
    all,
  });
}

const flashTypes = ['success', 'error', 'warning', 'info', 'message'];

/**
 * Auto-show toasts from Inertia flash data (native Inertia v2.3.3+/v3 API).
 *
 * Call once in your app layout — all flash messages will automatically
 * appear as toasts.
 *
 * Supports: `success`, `error`, `warning`, `info`, `message`.
 *
 * @example
 * // In your layout:
 * import { useFlashToasts } from '@js/Composables/useFlash';
 * useFlashToasts();
 *
 * // In a Laravel controller:
 * Inertia::flash('success', 'Saved!');
 * return back();
 */
export function useFlashToasts() {
  const page = usePage();

  watch(
    () => page.flash,
    (flash) => {
      if (!flash) return;

      for (const type of flashTypes) {
        const message = flash[type];
        if (!message) continue;

        const fn = type === 'message' ? toast : toast[type];

        nextTick(() => {
          if (typeof message === 'object') {
            fn(message.message, { description: message.description });
          } else {
            fn(message);
          }
        });
      }
    },
    { immediate: true }
  );
}
