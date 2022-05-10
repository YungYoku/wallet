<script lang="ts" setup>
import { ref } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

let name = ref("");
let color = ref("#9966cc");

function isValid() {
  return name.value && color.value;
}

function reset() {
  name.value = "";
  color.value = "#9966cc";
}

function create() {
  if (isValid()) {
    if (budgetsStore.bid) {
      updateDoc(doc(db, "budgets", budgetsStore.bid), {
        categories: arrayUnion({
          name: name.value,
          color: color.value,
          price: 0,
        }),
      });
      reset();
    }
  }
}
</script>

<template>
  <form class="newCategory" @submit.prevent="create">
    <div>
      <input
        v-model.trim="color"
        class="color"
        type="color"
        placeholder="Цвет"
      />

      <input
        v-model.trim="name"
        class="name"
        placeholder="Категория"
        type="text"
      />
    </div>

    <button type="submit">Создать</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  grid-template: repeat(2, 50px) / 1fr;
  box-shadow: 0 0 10px 1px var(--color-shadow);
  border-radius: 10px;
}

form div {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-background-soft);
}

.color {
  min-width: 30px;
  width: 30px;
  min-height: 30px;
  height: 30px;
  margin: 10px;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--color-background-soft);
}

.name,
button {
  width: 100%;
  height: 50px;
  min-height: 50px;
}

.color {
  cursor: pointer;
}

.name {
  text-align: center;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 10px 50px 10px 10px;
  transition: none;
  border-radius: 10px 10px 0 0;
}

.name,
button {
  font-size: 16px;
}

button {
  background-color: var(--color-background2);
  color: var(--color-text);
  border-radius: 0 0 10px 10px;
}

button:hover {
  background-color: v-bind("color");
}
</style>
