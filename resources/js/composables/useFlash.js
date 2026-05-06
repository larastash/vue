import { usePage } from '@inertiajs/vue3';
import { computed, nextTick, reactive, watch } from 'vue';
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

  const data = computed(() => page.props?.flash ?? {});

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
      console.log(flash);

      for (const [key, type] of Object.entries(flashToastMap)) {
        const message = flash[key];
        if (!message) continue;

        nextTick(() => {
          if (type === 'message') {
            if (typeof message === 'object') {
              toast(message.message, { description: message.description });
            } else {
              toast(message);
            }
          } else {
            if (typeof message === 'object') {
              toast[type](message.message, { description: message.description });
            } else {
              toast[type](message);
            }
          }
        });
      }
    },
    { immediate: true, deep: true }
  );
}
