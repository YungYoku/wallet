<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/main";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const router = useRouter();

const name = ref("");

const create = async () => {
  if (name.value) {
    const docRef = await addDoc(collection(db, "budgets"), {
      balance: 0,
      categories: [],
      chat: [],
      name: name.value,
      purchases: [],
    });
    const bid = docRef.id;

    await updateDoc(doc(db, "users", logsStore.uid), {
      budgets: arrayUnion(bid),
    });

    await budgetsStore.swapBudget(bid);
    await router.push("/");
  }
};
</script>

<template>
  <div class="createBudget">
    <h2>Создать</h2>

    <form @submit.prevent="create">
      <input
        v-model.trim="name"
        class="name"
        placeholder="Название бюджета"
        required
        type="text"
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
