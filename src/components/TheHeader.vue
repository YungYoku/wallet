<script lang="ts" setup>
import { useLogsStore } from "@/stores/logs";

const logsStore = useLogsStore();

async function logOut() {
  await logsStore.logout();
}
</script>

<template>
  <header>
    <div class="logo">
      <router-link to="/">Wallet</router-link>
    </div>

    <div class="tools">
      <router-link class="toolsItem" to="/join">
        <img alt="Присоединиться" src="@/assets/img/enter.svg" />
      </router-link>

      <router-link class="toolsItem" to="/create">
        <img alt="Создать" src="@/assets/img/plus.svg" />
      </router-link>

      <button class="toolsItem" type="button" @click="logOut">
        <img alt="Выйти" src="@/assets/img/exit.svg" />
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  z-index: 10;

  display: grid;
  justify-content: center;
  align-items: center;

  grid-gap: 20px;
  grid-template: auto / repeat(2, 1fr);

  height: 60px;
  padding: 0 10px;

  background-color: var(--color-header);
  box-shadow: 0 0 10px 1px var(--color-shadow);
}

header a,
header button {
  padding: 5px;

  line-height: 1;
  color: var(--color-text);
}

.logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo a {
  font-size: 18px;
  font-weight: bolder;
  text-transform: uppercase;
  font-style: normal;
}

.tools {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}

.toolsItem {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;

  font-size: 16px;
}

.logo a:hover,
.toolsItem:hover {
  text-decoration: underline;
}

.toolsItem img {
  width: 60%;
  height: 60%;

  transition: all 0.1s;
}

.toolsItem:hover img {
  transform: scale(1.1);
  transition: all 0.1s;
}

.dark .tools .toolsItem img {
  filter: invert(1);
}

.light .tools .toolsItem img {
  filter: invert(0.5);
}
</style>
