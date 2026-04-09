import { ComputedRef, readonly, ref, Ref } from 'vue';

/** Visual variant for the confirm dialog (e.g. button color). */
export type ConfirmVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

/** Options passed to the `confirm()` call. */
export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
}

/** Internal dialog state (all fields are always populated with defaults). */
interface ConfirmState {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: ConfirmVariant;
}

// Singleton reactive state shared across all useConfirm() instances
const visible = ref(false);
const state = ref<ConfirmState | null>(null);

let resolvePromise: ((value: boolean) => void) | null = null;

export function useConfirm() {
  /**
   * Open a confirm dialog.
   * @param options - Dialog configuration.
   * @returns `true` if confirmed, `false` if cancelled.
   */
  const confirm = (options: ConfirmOptions = {}): Promise<boolean> => {
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
    visible: readonly(visible) as ComputedRef<boolean>,
    /** Current dialog state (title, message, variant, etc.). */
    state: readonly(state) as ComputedRef<ConfirmState | null>,
    confirm,
    accept,
    cancel,
  };
}
