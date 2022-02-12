<script setup lang="ts">
import FeedAreaPurchase from "./FeedAreaPurchase.vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();
</script>

<template>
  <div>
    <div class="theFeedWrap">
      <div class="theFeed">
        <div class="feedTags">
          <h3>Имя</h3>
          <h3>Название</h3>
          <h3>Категория</h3>
          <h3>Цена</h3>
        </div>

        <feed-area-purchase
          v-for="purchase in budgetsStore.budget.purchases"
          :key="purchase"
          :item-name="purchase.itemName"
          :user-name="purchase.userName"
          :category="purchase.category"
          :price="purchase.price"
          :color="purchase.color"
        ></feed-area-purchase>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theFeedWrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  color: #ffffff;
  user-select: none;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}

.theFeed {
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: calc(100% + 8px);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.feedTags {
  height: 50px;
  display: grid;
  grid-template: 30px / 2fr 2fr 2fr 2fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 10px 20px 10px 10px;
  margin-bottom: 10px;
  background-color: var(--color-background2);
}

.feedTags h3 {
  color: var(--color-text);
}
</style>
