<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";
import { useLoadingStore } from "@/stores/loading";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();
const loadingStore = useLoadingStore();
const router = useRouter();

async function logOut() {
  loadingStore.show();
  localStorage.clear();
  budgetsStore.$reset();
  logsStore.$reset();
  await router.push("/login");
  loadingStore.hide();
}
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/">Wallet</router-link>
    </div>

    <div class="tools">
      <router-link to="/join">Присоединиться</router-link>
      <router-link to="/create">Создать</router-link>
      <button type="button" @click="logOut">Выйти</button>
    </div>
  </header>
</template>

<style scoped>
header {
  height: 60px;
  padding: 0 10px;
  background-color: var(--color-header);
  display: grid;
  grid-template: auto / repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  grid-gap: 20px;
  z-index: 10;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}

header a,
header button {
  padding: 10px;
  color: var(--color-text);
  border-radius: 20px;
  line-height: 1;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo a {
  font-style: normal;
  font-weight: bolder;
  font-size: 18px;
  text-transform: uppercase;
}

.tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.tools a,
.tools button {
  font-size: 16px;
  margin: 0 5px;
}

.logo a:hover,
.tools a:hover,
.tools button:hover {
  text-decoration: underline;
}
</style>
