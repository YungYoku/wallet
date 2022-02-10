<script setup lang="ts">
import { reactive } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

const form = reactive({
  name: "",
  color: "#9966cc",
  price: 0,
  isValid() {
    return this.name && this.color;
  },
  reset() {
    this.name = "";
    this.color = "#9966cc";
  },
});

function addCategory() {
  if (form.isValid()) {
    updateDoc(doc(db, "budgets", budgetsStore.id), {
      categories: arrayUnion({
        name: form.name,
        color: form.color,
        price: form.price,
      }),
    });
    form.reset();
  }
}
</script>

<template>
  <form class="newCategory" @submit.prevent="addCategory">
    <div>
      <input type="color" class="color" v-model.trim="form.color" />

      <input
        type="text"
        placeholder="Название категории"
        class="name"
        v-model.trim="form.name"
      />
    </div>

    <button type="submit">Создать</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  grid-template: repeat(2, 50px) / 1fr;
  margin-bottom: 10px;
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
  padding: 10px 40px 10px 10px;
  transition: none;
  border-radius: 10px 10px 0 0;
}

.name,
button {
  font-size: 20px;
}

button {
  background-color: var(--color-background2);
  color: var(--color-text);
  border-radius: 0 0 10px 10px;
}

button:hover {
  background-color: v-bind("form.color");
}
</style>
