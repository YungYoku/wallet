<script lang="ts" setup>
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

const itemName = ref("");
const userName = ref("");
const price = ref(0);
const category = ref({
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
      <label for="item">
        Товар:
        <input
          id="item"
          v-model.trim="itemName"
          placeholder="Название"
          type="text"
        />
      </label>

      <label for="name">
        Имя:
        <input
          id="name"
          v-model.trim="userName"
          placeholder="Имя"
          type="text"
        />
      </label>

      <label for="price">
        Цена:
        <input id="price" v-model.number="price" placeholder="0" type="text" />
      </label>

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

<style lang="scss" scoped>
form {
  display: grid;

  grid-gap: 5px;
  grid-template: repeat(4, 40px) / 1fr;

  padding: 10px 0 0 0;

  background-color: var(--color-background-soft);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);

  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 40px;
    padding: 5px 18px;

    font-size: 14px;
    gap: 5px;

    input {
      width: 100%;
      height: 40px;
      padding: 5px 10px;

      font-size: 14px;
      color: var(--color-text);

      background-color: var(--color-background-soft);
      border-radius: 5px;

      &:focus {
        background-color: var(--color-background-mute);
      }

      &:hover {
        background-color: var(--color-background-mute);
      }
    }
  }

  select,
  button {
    width: 100%;
    height: 40px;
    padding: 5px 10px;

    font-size: 14px;
  }

  select {
    width: calc(100% - 10px);
    margin: 0 5px;

    color: var(--color-text);

    background-color: var(--color-background-soft);
    border-radius: 5px;

    cursor: pointer;

    &:hover {
      background-color: var(--color-background-mute);
    }
  }

  button {
    color: var(--color-text);

    background-color: var(--color-background2);
    border-radius: 0 0 10px 10px;

    &:hover {
      background-color: #9966cc;
    }
  }
}
</style>
