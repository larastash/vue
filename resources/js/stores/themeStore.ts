import { defineStore } from 'pinia';

export type Theme = 'light' | 'dark' | 'system';

export const validThemes: Theme[] = ['light', 'dark', 'system'];
export const defaultTheme: Theme = 'system';

// Module-level singleton state for the system theme listener
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
    /** Resolved theme — always `'light'` or `'dark'` (never `'system'`). */
    effectiveTheme(state): Exclude<Theme, 'system'> {
      if (state.currentTheme === 'system') {
        const mq = getMediaQuery();
        return mq?.matches ? 'dark' : 'light';
      }
      return state.currentTheme as Exclude<Theme, 'system'>;
    },

    isDark(): boolean {
      return this.effectiveTheme === 'dark';
    },
  },

  actions: {
    setTheme(theme: Theme) {
      if (validThemes.includes(theme)) {
        this.currentTheme = theme;
      } else {
        this.currentTheme = defaultTheme;
      }
      this.applyTheme();
    },

    applyTheme() {
      if (typeof document === 'undefined') return;

      // Toggle 'dark' class for Tailwind CSS
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Store the user's theme preference (including 'system') as a data attribute
      document.documentElement.dataset.theme = this.currentTheme;
    },

    initTheme() {
      if (initialized) return;
      initialized = true;

      // Guard against invalid values from localStorage
      if (!validThemes.includes(this.currentTheme)) {
        this.currentTheme = defaultTheme;
      }

      this.applyTheme();
      this._bindSystemListener();
    },

    _bindSystemListener() {
      if (removeSystemListener) {
        removeSystemListener();
        removeSystemListener = null;
      }

      const mq = getMediaQuery();
      if (!mq) return;

      const handler = () => {
        // Only re-apply when the user has selected 'system'
        if (this.currentTheme === 'system') {
          this.applyTheme();
        }
      };

      // For modern browsers
      mq.addEventListener('change', handler);

      removeSystemListener = () => {
        mq.removeEventListener('change', handler);
      };
    },
  },

  persist: {
    key: 'theme',
    pick: ['currentTheme'],
    // Apply theme immediately after hydrating from localStorage
    afterHydrate(ctx) {
      ctx.store.applyTheme();
    },
  },
});
