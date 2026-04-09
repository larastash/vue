import { ComputedRef, readonly, ref, Ref } from 'vue';

// 1. Описываем варианты внешнего вида (например, для цвета кнопки)
export type ConfirmVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

// 2. Интерфейс входных параметров (то, что передаем в confirm)
export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
}

// 3. Интерфейс внутреннего состояния диалога (всегда с заполненными полями)
interface ConfirmState {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: ConfirmVariant;
}

// Глобальные реактивные переменные (синглтон-состояние)
const visible = ref(false);
const state = ref<ConfirmState | null>(null);

// Тип для функции разрешения промиса
let resolvePromise: ((value: boolean) => void) | null = null;

/**
 * Программный confirm-диалог через Promise.
 *
 * @example
 * const { confirm } = useConfirm();
 *
 * const ok = await confirm({
 *     title: 'Удалить запись?',
 *     message: 'Это действие нельзя отменить.',
 *     confirmText: 'Удалить',
 *     cancelText: 'Отмена',
 *     variant: 'danger',
 * });
 *
 * if (ok) { ... }
 */
export function useConfirm() {
  /**
   * Открывает диалог подтверждения.
   * @param options Настройки диалога.
   * @returns Promise<boolean> - true если подтверждено, false если отменено.
   */
  const confirm = (options: ConfirmOptions = {}): Promise<boolean> => {
    // Инициализируем состояние значениями по умолчанию + переданные опции
    state.value = {
      title: options.title ?? 'Подтверждение',
      message: options.message ?? 'Вы уверены?',
      confirmText: options.confirmText ?? 'Подтвердить',
      cancelText: options.cancelText ?? 'Отмена',
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
    // readonly предотвращает изменение состояния напрямую из компонентов
    visible: readonly(visible) as ComputedRef<boolean>,
    state: readonly(state) as ComputedRef<ConfirmState | null>,
    confirm,
    accept,
    cancel,
  };
}
