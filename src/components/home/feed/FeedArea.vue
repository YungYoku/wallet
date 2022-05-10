<script lang="ts" setup>
import FeedAreaPurchase from "./FeedAreaPurchase.vue";
import { useBudgetsStore } from "@/stores/budgets";
import FeedAreaTags from "@/components/home/feed/FeedAreaTags.vue";
import BgLoading from "@/components/BgLoading.vue";
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
const budgetsStore = useBudgetsStore();
</script>

<template>
  <div class="feedArea">
    <feed-area-tags />

    <div class="feedAreaPurchases">
      <bg-loading v-if="loadingStore.loading" />

      <feed-area-purchase
        v-else
        v-for="purchase in budgetsStore.budget.purchases"
        :key="purchase.itemName + purchase.price"
        :category="purchase.category"
        :color="purchase.color"
        :item-name="purchase.itemName"
        :price="purchase.price"
        :user-name="purchase.userName"
      />
    </div>
  </div>
</template>

<style scoped>
.feedArea {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  box-shadow: 0 0 10px 1px var(--color-shadow);
  display: grid;
  grid-template: 50px auto / 1fr;
  grid-gap: 10px;
  overflow: hidden;
}

.feedAreaPurchases {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
</style>
