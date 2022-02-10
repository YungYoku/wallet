import { defineStore } from "pinia";
import type { Budget } from "@/interfaces/budget";

export const useBudgetsStore = defineStore({
  id: "budgets",

  state: () => ({
    budget: {
      balance: 0,
      categories: [],
      chat: [],
      name: "",
      purchases: [],
    },
    id: localStorage.bid ? localStorage.bid : "",
    budgets: [],
  }),

  getters: {},

  actions: {
    setId(id: string): void {
      this.id = id;
    },

    setBudget(budget: Budget): void {
      this.budget = budget;
      if (budget.purchases) {
        for (const purchase of budget.purchases) {
          this.budget.balance += Number(purchase.price);
        }
      }
    },

    setBudgets(budgets: string[]): void {
      this.budgets = budgets;
    },
  },
});
