import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",

  state: () => ({
    loading: false,
  }),

  getters: {},

  actions: {
    show() {
      console.log("showed");
      this.loading = true;
    },

    hide() {
      console.log("hidden");
      this.loading = false;
    },
  },
});
