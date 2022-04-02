<script lang="ts" setup>
import { computed, watch } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";
import { useLoadingStore } from "@/stores/loading";
import type { Layout } from "@/interfaces/layout";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const loadingStore = useLoadingStore();

let layout = computed<string>(() => {
  let layout: string = useRoute().meta.layout as string;
  return layout ? layout : "EmptyLayout";
});

const layouts: Layout = {
  StandardLayout,
  EmptyLayout,
};

let bid = computed<string>(() => budgetsStore.bid);

function loadInfo() {
  if (logsStore.uid) {
    loadingStore.show();
    budgetsStore.subscribeUserInfo();
    budgetsStore.subscribeBudgetInfo();
    loadingStore.hide();
  }
}

loadInfo();
logsStore.$subscribe(() => loadInfo());

watch(bid, () => {
  if (bid.value) {
    loadingStore.show();
    budgetsStore.subscribeBudgetInfo();
    loadingStore.hide();
  }
});
</script>

<template>
  <the-loading v-if="loadingStore.loading" />
  <component :is="layouts[layout]" v-if="!loadingStore.loading">
    <router-view />
  </component>
</template>

<style>
#app {
  height: 100vh;
  background: var(--color-body);
}
</style>
