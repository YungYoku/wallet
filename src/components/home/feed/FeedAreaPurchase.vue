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
    <button @click="deletePurchase">
      <img src="@/assets/img/close.png" alt="Удалить" />
    </button>
  </div>
</template>

<style scoped>
.feedPurchase {
  height: 50px;
  display: grid;
  grid-template: 30px / 2fr 2fr 2fr 2fr 32px;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: var(--color-background2);
  position: relative;
  border-left: 4px solid v-bind("props.color");
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
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

button img {
  width: 70%;
  height: 70%;
}

button:hover img {
  width: 80%;
  height: 80%;
}

.dark button img {
  filter: invert(1);
}

.light button img {
  filter: invert(0.5);
}
</style>
