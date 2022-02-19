<script setup lang="ts">
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { reactive, ref } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

let itemName = ref("");
let price = ref(0);
let userName = ref("");
let category = reactive({
  color: "",
  name: "Категория",
  price: 0,
});

function isValid() {
  return (
    itemName.value.length > 0 &&
    price.value &&
    price.value > 0 &&
    userName.value &&
    category &&
    category.color &&
    category.name !== "Категория"
  );
}

function reset() {
  itemName.value = "";
  price.value = 0;
  userName.value = "";
  category = {
    color: "",
    name: "Категория",
    price: 0,
  };
}

function create() {
  if (isValid()) {
    if (budgetsStore.bid) {
      updateDoc(doc(db, "budgets", budgetsStore.bid), {
        purchases: arrayUnion({
          itemName: itemName.value,
          userName: userName.value,
          category: category.name,
          price: price.value,
          color: category.color,
        }),
      });
      reset();
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="create">
      <input type="text" placeholder="Товар" v-model.trim="itemName" />
      <input type="text" placeholder="Имя" v-model.trim="userName" />
      <input type="text" placeholder="Цена" v-model.number="price" />
      <select v-model="category">
        <option
          :value="{
            color: '',
            name: 'Категория',
            price: 0,
          }"
          disabled
          selected
        >
          Категория
        </option>
        <option
          v-for="item in budgetsStore.budget.categories"
          :value="item"
          :key="item.name"
        >
          {{ item.name }}
        </option>
      </select>
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  grid-template: repeat(4, 40px) / 1fr;
  grid-gap: 5px;
  background-color: var(--color-background-soft);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}

input,
select,
button {
  height: 40px;
  padding: 5px 10px;
}

input:first-child {
  border-radius: 10px 10px 0 0;
}

input,
select {
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

button {
  background-color: var(--color-background2);
  color: var(--color-text);
  border-radius: 0 0 10px 10px;
}

button:hover {
  background-color: #9966cc;
}
</style>
