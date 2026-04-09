import { defineStore } from 'pinia';

interface AppState {
    //
}

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    //
  }),

  getters: {
    //
  },

  actions: {
    //
  },

  persist: {
    key: 'app',
  },
});
