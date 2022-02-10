<script setup lang="ts">
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

async function loginBudget() {
  if (budget.isValid()) {
    budget.id = budget.name + "-" + budget.pass;
    await updateDoc(doc(db, "users", logsStore.uid), {
      budgets: arrayUnion(budget.id),
    });
    budgetsStore.setId(budget.id);
    localStorage.bid = budget.id;
    await router.push("/");
  }
}
</script>

<template>
  <div class="joinBudget">
    <form @submit.prevent="loginBudget()">
      <input
        class="name"
        type="text"
        placeholder="Название бюджета"
        v-model.trim="budget.name"
      />

      <input
        class="password"
        type="password"
        placeholder="Пароль"
        v-model.trim="budget.pass"
      />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<style scoped>
.joinBudget {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
