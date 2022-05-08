<script lang="ts" setup>
import { computed } from "vue";
import TheLoading from "@/components/TheLoading.vue";
import StandardLayout from "@/layouts/StandardLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { useRoute } from "vue-router";
import { useBudgetsStore } from "@/stores/budgets";
import { useLoadingStore } from "@/stores/loading";
import type { Layout } from "@/interfaces/layout";

const budgetsStore = useBudgetsStore();
const loadingStore = useLoadingStore();

const route = useRoute();

let layout = computed<string>(() => {
  return (route.meta.layout as string) || "EmptyLayout";
});

const layouts: Layout = {
  StandardLayout,
  EmptyLayout,
};

budgetsStore.subscribeInfo();
</script>

<template>
  <the-loading v-if="loadingStore.loading" />
  <component :is="layouts[layout]" v-else>
    <router-view />
  </component>
</template>

<style>
#app {
  height: 100vh;
  background: var(--color-body);
  isolation: isolate;
}
</style>
