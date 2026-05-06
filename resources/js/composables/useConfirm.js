import { readonly, ref } from 'vue';

// Singleton reactive state shared across all useConfirm() instances
const visible = ref(false);
const state = ref(null);

let resolvePromise = null;

export function useConfirm() {
  /**
   * Open a confirm dialog.
   * @param options - Dialog configuration.
   * @returns `true` if confirmed, `false` if cancelled.
   */
  const confirm = (options = {}) => {
    // Merge defaults with provided options
    state.value = {
      title: options.title ?? 'Confirm',
      message: options.message ?? 'Are you sure?',
      confirmText: options.confirmText ?? 'Confirm',
      cancelText: options.cancelText ?? 'Cancel',
      variant: options.variant ?? 'default',
    };

    visible.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const accept = () => {
    visible.value = false;
    if (resolvePromise) {
      resolvePromise(true);
      resolvePromise = null;
    }
  };

  const cancel = () => {
    visible.value = false;
    if (resolvePromise) {
      resolvePromise(false);
      resolvePromise = null;
    }
  };

  return {
    /** Whether the dialog is currently visible. */
    visible: readonly(visible),
    /** Current dialog state (title, message, variant, etc.). */
    state: readonly(state),
    confirm,
    accept,
    cancel,
  };
}
