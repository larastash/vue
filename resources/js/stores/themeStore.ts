import { defineStore } from 'pinia';

// 1. Определяем типы
export type Theme = 'light' | 'dark' | 'system';

export const validThemes: Theme[] = ['light', 'dark', 'system'];
export const defaultTheme: Theme = 'system';

// 2. Глобальные переменные для слушателя системной темы
let initialized = false;
let removeSystemListener: (() => void) | null = null;

const getMediaQuery = (): MediaQueryList | null => {
  if (typeof window === 'undefined') return null;
  return window.matchMedia('(prefers-color-scheme: dark)');
};

interface ThemeState {
  currentTheme: Theme;
}

export const useThemeStore = defineStore('themeStore', {
  state: (): ThemeState => ({
    currentTheme: defaultTheme,
  }),

  getters: {
    // effectiveTheme всегда возвращает конкретную тему 'light' или 'dark'
    effectiveTheme(state): Exclude<Theme, 'system'> {
      if (state.currentTheme === 'system') {
        const mq = getMediaQuery();
        return mq?.matches ? 'dark' : 'light';
      }
      // Приводим тип, так как мы знаем, что здесь не 'system'
      return state.currentTheme as Exclude<Theme, 'system'>;
    },

    isDark(): boolean {
      return this.effectiveTheme === 'dark';
    },
  },

  actions: {
    setTheme(theme: Theme) {
      // Проверка на валидность уже обеспечена типом Theme,
      // но оставляем фоллбек на случай передачи любого string из JS-кода
      if (validThemes.includes(theme)) {
        this.currentTheme = theme;
      } else {
        this.currentTheme = defaultTheme;
      }
      this.applyTheme();
    },

    applyTheme() {
      if (typeof document === 'undefined') return;

      // Добавляем/убираем класс 'dark' для Tailwind CSS
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Сохраняем текущую настройку пользователя (включая 'system') в data-атрибут
      document.documentElement.dataset.theme = this.currentTheme;
    },

    initTheme() {
      if (initialized) return;
      initialized = true;

      // Если после гидратации пришло невалидное значение (маловероятно с типами, но возможно при ручном изменении localStorage)
      if (!validThemes.includes(this.currentTheme)) {
        this.currentTheme = defaultTheme;
      }

      this.applyTheme();
      this._bindSystemListener();
    },

    _bindSystemListener() {
      // Очищаем предыдущий слушатель, если он был
      if (removeSystemListener) {
        removeSystemListener();
        removeSystemListener = null;
      }

      const mq = getMediaQuery();
      if (!mq) return;

      const handler = () => {
        // Пересчитываем тему только если выбран режим 'system'
        if (this.currentTheme === 'system') {
          this.applyTheme();
        }
      };

      // Для современных браузеров используем addEventListener
      mq.addEventListener('change', handler);

      // Запоминаем функцию очистки
      removeSystemListener = () => {
        mq.removeEventListener('change', handler);
      };
    },
  },

  persist: {
    key: 'theme',
    pick: ['currentTheme'],
    // afterHydrate вызывается после восстановления состояния из хранилища
    afterHydrate(ctx) {
      // ctx.store имеет тип нашего стора, поэтому applyTheme доступен
      ctx.store.applyTheme();
    },
  },
});
