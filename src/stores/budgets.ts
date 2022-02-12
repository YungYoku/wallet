import { defineStore } from "pinia";
import type { Budget } from "@/interfaces/budget";
import type { Purchase } from "@/interfaces/purchase";
import type { Category } from "@/interfaces/category";
import type { Message } from "@/interfaces/message";

export const useBudgetsStore = defineStore({
  id: "budgets",

  state: () => ({
    budget: {
      balance: 0,
      categories: [] as Category[],
      chat: [] as Message[],
      name: "",
      purchases: [] as Purchase[],
    },
    id: localStorage.bid ? localStorage.bid : "",
    budgets: [] as string[],
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
