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

let budget = reactive({
  name: "",
  pass: "",
  id: "",
  isValid() {
    return budget.name.length >= 4 && budget.pass.length >= 6;
  },
});

async function createBudget() {
  if (budget.isValid()) {
    budget.id = budget.name + "-" + budget.pass;

    await setDoc(doc(db, "budgets", budget.id), {
      balance: 0,
      categories: [],
      chat: [],
      name: budget.name,
      purchases: [],
    });

    await updateDoc(doc(db, "users", logsStore.uid), {
      budgets: arrayUnion(budget.id),
    });

    await budgetsStore.setBid(budget.id);
    await router.push("/");
  }
}
</script>

<template>
  <div class="createBudget">
    <h2>Создать бюджет</h2>

    <form @submit.prevent="createBudget">
      <input
        v-model.trim="budget.name"
        class="name"
        placeholder="Название бюджета"
        type="text"
      />

      <input
        v-model.trim="budget.pass"
        class="password"
        placeholder="Пароль"
        type="password"
      />
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<style scoped>
.createBudget {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
}

h2 {
  font-size: 32px;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
}

form {
  display: grid;
  grid-template: 80px 80px 80px / 1fr;
  padding: 10px 20px;
}

.name,
.password {
  width: 100%;
  height: 60px;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: none;
}

.name:hover,
.password:hover {
  background-color: #f0f0f0;
}

.name:focus,
.password:focus {
  outline: 5px solid #9966cc;
  background-color: #ffffff;
}

button {
  width: 100%;
  margin-bottom: 20px;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: black;
  background-color: #e9e9ed;
}

button:hover {
  background-color: #333333;
  color: #cccccc;
}

@media (max-width: 1200px) {
  form {
    display: grid;
    grid-template: 80px 80px 80px / 1fr;
    padding: 10px 20px;
    margin: 140px 25% 0 25%;
  }
}
</style>
