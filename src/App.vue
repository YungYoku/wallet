<script setup lang="ts">
import { computed, watch } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import { db } from "@/main";
import { doc, onSnapshot } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";
import { useLoadingStore } from "@/stores/loading";
import type { Budget } from "@/interfaces/budget";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const loadingStore = useLoadingStore();
const route = useRoute();

let layout = computed<string>(() => route.meta.layout as string);

const tabs = {
  StandardLayout,
  EmptyLayout,
};

let uid = computed<boolean>(() => logsStore.uid);
let bid = computed<string>(() => budgetsStore.id);

async function getUserInfo() {
  await onSnapshot(doc(db, "users", logsStore.uid), (data) => {
    if (data.exists()) {
      budgetsStore.setBudgets(data.data().budgets);
      logsStore.setName(data.data().name);
      if (!bid.value) {
        budgetsStore.setId(data.data().budgets[0]);
      }
    }
  });
}

async function getBudgetInfo() {
  if (bid.value) {
    await onSnapshot(doc(db, "budgets", bid.value), (data) => {
      if (data.exists()) {
        budgetsStore.setBudget(data.data() as Budget);
      }
    });
  }
}

async function getAllInfo() {
  if (logsStore.uid) {
    loadingStore.show();
    await getUserInfo();
    await getBudgetInfo();
    loadingStore.hide();
  }
}

watch(uid, () => getAllInfo(), { immediate: true });

watch(bid, async () => {
  if (bid.value) {
    loadingStore.show();
    await getBudgetInfo();
    loadingStore.hide();
  }
});
</script>

<template>
  <the-loading v-if="loadingStore.loading" />
  <component v-if="!loadingStore.loading" :is="tabs[layout]">
    <router-view />
  </component>
</template>

<style>
@import "@/assets/base.css";

#app {
  height: 100vh;
  background: var(--color-body);
}
</style>
