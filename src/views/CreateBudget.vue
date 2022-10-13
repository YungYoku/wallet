<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/main";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const router = useRouter();

const budget = reactive({
  name: "",
  password: "",
  isValid() {
    return budget.name.length >= 4 && budget.password.length >= 6;
  },
});

const create = async () => {
  if (budget.isValid()) {
    const budgetId = budget.name + "-" + budget.password;

    await setDoc(doc(db, "budgets", budgetId), {
      balance: 0,
      categories: [],
      chat: [],
      name: budget.name,
      purchases: [],
    })
      .then(async () => {
        await updateDoc(doc(db, "users", logsStore.uid), {
          budgets: arrayUnion({
            name: budget.name,
            password: budget.password,
          }),
        });

        await budgetsStore.swapBudget(budgetId);
        await router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
</script>

<template>
  <div class="createBudget">
    <h2>Создать</h2>

    <form @submit.prevent="create">
      <input
        v-model.trim="budget.name"
        class="name"
        placeholder="Название бюджета"
        required
        type="text"
      />

      <input
        v-model.trim="budget.password"
        class="password"
        placeholder="Пароль"
        required
        type="password"
      />
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.createBudget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;

  h2 {
    font-size: 70px;
    font-weight: 500;
    text-align: center;
    color: var(--color-text);

    @media screen and (max-width: 768px) {
      font-size: 50px;
    }

    @media screen and (max-width: 480px) {
      font-size: 40px;
    }
  }

  form {
    display: grid;

    grid-template: 80px 80px 80px / 1fr;

    min-width: 300px;
    padding: 10px 20px;

    .name,
    .password {
      width: 100%;
      height: 60px;
      margin-bottom: 20px;
      padding: 10px;

      font-size: 20px;

      border: none;
      border-radius: 10px;

      &:hover {
        background-color: #f0f0f0;
      }

      &:focus {
        background-color: #ffffff;
        outline: 5px solid #9966cc;
      }
    }

    button {
      width: 100%;
      margin-bottom: 20px;
      padding: 10px;

      font-size: 20px;
      color: black;

      background-color: #e9e9ed;
      border: none;
      border-radius: 10px;

      &:hover {
        color: #cccccc;

        background-color: #333333;
      }
    }

    @media (max-width: 1200px) {
      display: grid;

      grid-template: 80px 80px 80px / 1fr;

      margin: 0 25%;
      padding: 10px 20px;
    }
  }
}
</style>
