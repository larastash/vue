import { usePage } from '@inertiajs/vue3';
import { computed, ComputedRef, watch } from 'vue';
import { toast } from 'vue-sonner';

// 1. Описываем структуру Flash-сообщений
// Вы можете расширить этот интерфейс, если используете другие ключи в Laravel
export interface FlashMessages {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
  message?: string;
  [key: string]: string | undefined; // Для поддержки кастомных ключей
}

// 2. Типы для маппинга тостов
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'message';

const flashToastMap: Record<string, ToastType> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  message: 'message',
};

/**
 * Композабл для доступа к Flash-сообщениям из Inertia props.
 */
export function useFlash() {
  const page = usePage();

  // Приводим props.flash к нашему интерфейсу
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
 * Авто-показ тостов из Inertia flash.
 *
 * Вызови один раз в AppLayout — и все flash-сообщения из Laravel
 * будут автоматически показаны как тосты.
 *
 * @example
 * // В AppLayout.vue:
 * import { useFlashToasts } from '@/composables/useFlash';
 * useFlashToasts();
 *
 * // В контроллере Laravel:
 * return back()->with('success', 'Сохранено!');
 */
export function useFlashToasts() {
  const page = usePage();

  watch(
    () => page.props?.flash as FlashMessages | undefined,
    (flash) => {
      if (!flash) return;

      // Проходим по всем известным ключам тостов
      for (const [key, type] of Object.entries(flashToastMap)) {
        const message = flash[key];

        // Пропускаем, если сообщения нет или оно пустое
        if (!message) continue;

        // vue-sonner поддерживает вызов toast.success(), toast.error() и т.д.
        // Для типа 'message' используем обычный toast()
        if (type === 'message') {
          toast(message);
        } else {
          // TypeScript может ругаться на динамический доступ к методам toast,
          // поэтому используем приведение типа или проверку.
          // Так как мы контролируем flashToastMap, это безопасно.
          (toast as any)[type](message);
        }
      }
    },
    { immediate: true }
  );
}
