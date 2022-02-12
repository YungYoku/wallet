<script setup lang="ts">
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { reactive } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

const purchase = reactive({
  itemName: "",
  price: 0,
  userName: "",
  category: {
    color: "",
    name: "Категория",
    price: 0,
  },
  isValid() {
    return (
      this.itemName.length > 0 &&
      this.price &&
      this.price > 0 &&
      this.userName &&
      this.category &&
      this.category.color &&
      this.category.name !== "Категория"
    );
  },
  reset() {
    this.itemName = "";
    this.price = 0;
    this.userName = "";
    this.category = {
      color: "",
      name: "Категория",
      price: 0,
    };
  },
});

function addPurchase() {
  if (purchase.isValid()) {
    updateDoc(doc(db, "budgets", budgetsStore.id), {
      purchases: arrayUnion({
        itemName: purchase.itemName,
        userName: purchase.userName,
        category: purchase.category.name,
        price: purchase.price,
        color: purchase.category.color,
      }),
    });
    purchase.reset();
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="addPurchase()">
      <input type="text" placeholder="Товар" v-model.trim="purchase.itemName" />
      <input type="text" placeholder="Имя" v-model.trim="purchase.userName" />
      <input type="text" placeholder="Цена" v-model.number="purchase.price" />
      <select v-model="purchase.category">
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
