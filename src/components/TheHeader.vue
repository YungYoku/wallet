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
      <router-link class="toolsItem" to="/join">
        <img src="@/assets/img/enter.svg" alt="Присоединиться" />
      </router-link>

      <router-link class="toolsItem" to="/create">
        <img src="@/assets/img/plus.svg" alt="Создать" />
      </router-link>

      <button class="toolsItem" type="button" @click="logOut">
        <img src="@/assets/img/exit.svg" alt="Выйти" />
      </button>
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
  padding: 5px;
  color: var(--color-text);
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
  gap: 5px;
}

.toolsItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.logo a:hover,
.toolsItem:hover {
  text-decoration: underline;
}

.toolsItem {
  width: 48px;
  height: 48px;
}

.toolsItem img {
  width: 60%;
  height: 60%;
  transition: all 0.1s;
}

.toolsItem:hover img {
  transition: all 0.1s;
  transform: scale(1.1);
}

.dark .tools .toolsItem img {
  filter: invert(1);
}

.light .tools .toolsItem img {
  filter: invert(0.5);
}
</style>
