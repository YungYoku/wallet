<script lang="ts" setup>
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

let itemName = ref("");
let userName = ref("");
let price = ref(0);
let category = ref({
  color: "",
  name: "Категория",
  price: 0,
});

function isValid() {
  return (
    itemName.value.length > 0 &&
    userName.value.length &&
    price.value &&
    price.value > 0 &&
    category.value.name !== "Категория"
  );
}

function reset() {
  itemName.value = "";
  price.value = 0;
  userName.value = "";
  category.value = {
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
          category: category.value.name,
          price: price.value,
          color: category.value.color,
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
      <input v-model.trim="itemName" placeholder="Товар" type="text" />

      <input v-model.trim="userName" placeholder="Имя" type="text" />

      <input v-model.number="price" placeholder="Цена" type="text" />

      <select v-model="category" name="category" title="category">
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
          :key="item.name"
          :value="item"
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
