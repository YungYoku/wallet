import { defineStore } from "pinia";

export const useLogsStore = defineStore({
  id: "logs",

  state: () => ({
    uid: localStorage.uid ? localStorage.uid : "",
    name: "",
  }),

  getters: {},

  actions: {
    setUid(uid: string): void {
      this.uid = uid;
    },

    setName(name: string): void {
      this.name = name;
    },
  },
});
