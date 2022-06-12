<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const router = useRouter();

const budget = reactive({
  name: "",
  pass: "",
  id: "",
  isValid() {
    return budget.name.length >= 4 && budget.pass.length >= 6;
  },
});

async function joinBudget() {
  if (budget.isValid()) {
    budget.id = budget.name + "-" + budget.pass;
    await updateDoc(doc(db, "users", logsStore.uid), {
      budgets: arrayUnion(budget.id),
    });
    await budgetsStore.setBid(budget.id);
    await router.push("/");
  }
}
</script>

<template>
  <div class="joinBudget">
    <h2>Присоединиться к бюджету</h2>

    <form @submit.prevent="joinBudget">
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

      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<style scoped>
.joinBudget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  gap: 40px;
}

h2 {
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
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
  margin-bottom: 20px;
  padding: 10px;

  font-size: 20px;

  border: none;
  border-radius: 10px;
}

.name:hover,
.password:hover {
  background-color: #f0f0f0;
}

.name:focus,
.password:focus {
  background-color: #ffffff;
  outline: 5px solid #9966cc;
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
}

button:hover {
  color: #cccccc;

  background-color: #333333;
}

@media (max-width: 1200px) {
  form {
    display: grid;

    grid-template: 80px 80px 80px / 1fr;

    margin: 140px 25% 0 25%;
    padding: 10px 20px;
  }
}
</style>
