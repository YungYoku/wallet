import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",

  state: () => ({
    loading: true,
  }),

  getters: {},

  actions: {
    show() {
      this.loading = true;
    },

    hide() {
      this.loading = false;
    },
  },
});
