<script lang="ts" setup>
import { db } from "@/main";
import { doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import type { Purchase } from "@/interfaces/purchase";

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const budgetsStore = useBudgetsStore();

async function deletePurchase() {
  let purchases: Purchase[] = budgetsStore.budget.purchases;
  purchases = purchases.filter(
    (item) =>
      !(
        item.price === props.price &&
        item.userName === props.userName &&
        item.itemName === props.itemName
      )
  );

  await updateDoc(doc(db, "budgets", budgetsStore.bid), {
    purchases,
  });
}
</script>

<template>
  <div class="feedPurchase">
    <h3>{{ userName }}</h3>
    <h3>{{ itemName }}</h3>
    <h3>{{ category }}</h3>
    <h3>{{ price }} руб</h3>
    <button type="button" @click="deletePurchase">
      <img alt="Удалить" src="@/assets/img/close.svg" />
    </button>
  </div>
</template>

<style scoped>
.feedPurchase {
  position: relative;

  display: grid;
  align-items: center;

  grid-gap: 10px;
  grid-template: 30px / 2fr 2fr 2fr 2fr 32px;

  height: 50px;
  margin-bottom: 10px;
  padding: 10px 20px 10px 10px;

  background-color: var(--color-background2);
  border-left: 4px solid v-bind("props.color");
  border-radius: 10px;
  justify-items: center;
}

.feedPurchase:hover {
  background-color: var(--color-background-mute);
}

h3,
button {
  font-size: 16px;
  color: var(--color-text);
}

button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;
}

button img {
  width: 70%;
  height: 70%;

  transition: all 0.1s;
}

button:hover img {
  transform: scale(1.1);
  transition: all 0.1s;
}

.dark button img {
  filter: invert(1);
}

.light button img {
  filter: invert(0.5);
}
</style>
