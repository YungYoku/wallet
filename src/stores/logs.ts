import { defineStore } from "pinia";
import type { Unsubscribe } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLoadingStore } from "@/stores/loading";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/main";
import router from "@/router";
import { useBudgetsStore } from "@/stores/budgets";

export const useLogsStore = defineStore({
  id: "logs",

  state: () => ({
    uid: localStorage.uid ? localStorage.uid : "",
    name: "",
    userUnsubscribe: Function as Unsubscribe,
  }),

  getters: {},

  actions: {
    setUid(uid: string) {
      const budgetsStore = useBudgetsStore();

      this.uid = uid;
      localStorage.uid = uid;
      budgetsStore.subscribeInfo();
    },

    async subscribeUserInfo() {
      const budgets = useBudgetsStore();

      this.userUnsubscribe = await onSnapshot(
        doc(db, "users", this.uid),
        (data) => {
          if (data.exists()) {
            this.name = data.data().name;
            budgets.setBudgets(data.data().budgets);
          }
        }
      );
    },

    login({ email, pass }: { email: string; pass: string }) {
      const loading = useLoadingStore();
      loading.show();

      signInWithEmailAndPassword(getAuth(), email, pass).then(
        async (userCredential) => {
          const user = userCredential.user;
          this.setUid(user.uid);
          await router.push("/");
          loading.hide();
        },
        (err) => {
          alert(err);
          loading.hide();
        }
      );
    },

    register({ email, pass }: { email: string; pass: string }) {
      const loading = useLoadingStore();
      loading.show();

      createUserWithEmailAndPassword(getAuth(), email, pass).then(
        async (userCredential) => {
          const user = userCredential.user;
          const name = email;
          await setDoc(doc(db, "users", user.uid), {
            name,
            budgets: [],
          });
          this.setUid(user.uid);
          await router.push("/");
          loading.hide();
        },
        (err) => {
          alert(err);
          loading.hide();
        }
      );
    },

    async logout() {
      const loading = useLoadingStore();
      const budgets = useBudgetsStore();

      loading.show();
      this.userUnsubscribe();
      this.$reset();
      budgets.unsubscribe();
      budgets.$reset();
      await localStorage.clear();
      await router.push("/login");
      loading.hide();
    },
  },
});
