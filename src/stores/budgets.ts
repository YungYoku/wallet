import { defineStore } from "pinia";
import type { Budget } from "@/interfaces/budget";
import type { Purchase } from "@/interfaces/purchase";
import type { Category } from "@/interfaces/category";
import type { Message } from "@/interfaces/message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";

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
    bid: localStorage.bid ? localStorage.bid : "",
    budgets: [] as string[],
  }),

  getters: {},

  actions: {
    subscribeUserInfo() {
      const logs = useLogsStore();
      onSnapshot(doc(db, "users", logs.uid), (data) => {
        if (data.exists()) {
          this.setBudgets(data.data().budgets);
          this.bid = data.data().budgets[0];
        }
      });
    },

    subscribeBudgetInfo() {
      if (this.bid) {
        onSnapshot(doc(db, "budgets", this.bid), (data) => {
          if (data.exists()) {
            this.setBudget(data.data() as Budget);
          }
        });
      }
    },

    setBid(bid: string): void {
      this.bid = bid;
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
