<script lang="ts" setup>
import { ref } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

const name = ref("");
const color = ref("#9966cc");

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
        placeholder="Цвет"
        type="color"
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

<style lang="scss" scoped>
form {
  display: grid;

  grid-template: repeat(2, 50px) / 1fr;

  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--color-background-soft);
    border-radius: 10px 10px 0 0;
  }

  .color {
    width: 30px;
    min-width: 30px;
    height: 30px;
    min-height: 30px;
    margin: 10px;
    overflow: hidden;

    background-color: var(--color-background-soft);
    border-radius: 15px;

    cursor: pointer;
  }

  .name,
  button {
    width: 100%;
    height: 50px;
    min-height: 50px;

    font-size: 16px;
  }

  .name {
    padding: 10px 50px 10px 10px;

    text-align: center;
    color: var(--color-text);

    background-color: var(--color-background-soft);
    border-radius: 10px 10px 0 0;

    transition: none;
  }

  button {
    color: var(--color-text);

    background-color: var(--color-background2);
    border-radius: 0 0 10px 10px;

    &:hover {
      background-color: v-bind("color");
    }
  }
}
</style>
