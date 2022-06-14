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
        v-for="purchase in budgetsStore.budget.purchases"
        v-else
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

<style lang="scss" scoped>
.feedArea {
  display: grid;

  grid-gap: 10px;
  grid-template: 50px auto / 1fr;

  width: 100%;
  height: 100%;
  overflow: hidden;

  background-color: var(--color-background-soft);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);

  .feedAreaPurchases {
    position: relative;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
