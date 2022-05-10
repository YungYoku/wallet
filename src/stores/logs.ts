import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useLoadingStore } from "@/stores/loading";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main";
import router from "@/router";
import { useBudgetsStore } from "@/stores/budgets";

export const useLogsStore = defineStore({
  id: "logs",

  state: () => ({
    uid: localStorage.uid ? localStorage.uid : "",
    name: "",
  }),

  getters: {},

  actions: {
    setUid(uid: string) {
      const budgetsStore = useBudgetsStore();

      this.uid = uid;
      localStorage.uid = uid;
      budgetsStore.subscribeInfo();
    },

    login({ email, pass }: { email: string; pass: string }) {
      const loading = useLoadingStore();
      loading.show();

      signInWithEmailAndPassword(getAuth(), email, pass).then(
        async (userCredential) => {
          const user = userCredential.user;
          this.name = email;
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
          this.name = email;
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
      this.$reset();
      budgets.unsubscribe();
      budgets.$reset();
      await localStorage.clear();
      await router.push("/login");
      loading.hide();
    },
  },
});
