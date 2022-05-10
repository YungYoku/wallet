import { defineStore } from "pinia";
import type { Budget } from "@/interfaces/budget";
import type { Purchase } from "@/interfaces/purchase";
import type { Category } from "@/interfaces/category";
import type { Message } from "@/interfaces/message";
import { doc, onSnapshot } from "firebase/firestore";
import type { Unsubscribe } from "firebase/auth";
import { db } from "@/main";
import { useLogsStore } from "@/stores/logs";
import { useLoadingStore } from "@/stores/loading";

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
    userUnsubscribe: Function as Unsubscribe,
    budgetUnsubscribe: Function as Unsubscribe,
  }),

  getters: {},

  actions: {
    async setBid(bid: string) {
      const loadingStore = useLoadingStore();

      this.bid = bid;
      loadingStore.show();
      await this.budgetUnsubscribe();
      await this.subscribeBudgetInfo().then(() => {
        loadingStore.hide();
      });
    },

    async subscribeInfo() {
      const logs = useLogsStore();
      if (logs.uid) {
        const loadingStore = useLoadingStore();

        loadingStore.show();
        await this.subscribeUserInfo().then(() => {
          this.subscribeBudgetInfo().then(() => {
            loadingStore.hide();
          });
        });
      }
    },

    async subscribeUserInfo() {
      const logs = useLogsStore();

      this.userUnsubscribe = await onSnapshot(
        doc(db, "users", logs.uid),
        (data) => {
          if (data.exists()) {
            this.setBudgets(data.data().budgets);
            this.bid = data.data().budgets[0];
          }
        }
      );
    },

    async subscribeBudgetInfo() {
      if (this.bid) {
        this.budgetUnsubscribe = await onSnapshot(
          doc(db, "budgets", this.bid),
          (data) => {
            if (data.exists()) {
              this.setBudget(data.data() as Budget);
            }
          }
        );
      }
    },

    setBudget(budget: Budget) {
      this.budget = budget;
      if (budget.purchases) {
        for (const purchase of budget.purchases) {
          this.budget.balance += Number(purchase.price);
        }
      }
    },

    setBudgets(budgets: string[]) {
      this.budgets = budgets;
    },

    unsubscribe() {
      this.userUnsubscribe();
      this.budgetUnsubscribe();
    },
  },
});
