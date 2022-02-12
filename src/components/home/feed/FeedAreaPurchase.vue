<script setup lang="ts">
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

  await updateDoc(doc(db, "budgets", budgetsStore.id), {
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
    <button @click="deletePurchase()">Удалить</button>
  </div>
</template>

<style scoped>
.feedPurchase {
  height: 50px;
  display: grid;
  grid-template: 30px / 2fr 2fr 2fr 2fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 10px 20px 10px 10px;
  border-radius: 0 30px 30px 0;
  margin-bottom: 10px;
  background-color: var(--color-background2);
  position: relative;
  border-left: 4px solid v-bind("props.color");
}

h3,
button {
  color: var(--color-text);
}
</style>
