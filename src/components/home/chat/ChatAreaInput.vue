<script lang="ts" setup>
import { ref } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();

let message = ref("");

function getDate() {
  return {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  };
}

function sendMessage() {
  if (message.value) {
    if (budgetsStore.bid) {
      updateDoc(doc(db, "budgets", budgetsStore.bid), {
        chat: arrayUnion({
          message: message.value,
          date: getDate(),
          name: logsStore.name,
        }),
      });
      message.value = "";
    }
  }
}
</script>

<template>
  <form @submit.prevent="sendMessage()">
    <input v-model.trim="message" placeholder="Сообщение" type="text" />
    <button type="submit">
      <img alt="Send" src="@/assets/img/send.svg" />
    </button>
  </form>
</template>

<style scoped>
form {
  width: 100%;
  display: grid;
  grid-template: 100% / 1fr 50px;
  align-items: center;
  position: relative;
  bottom: 0;
  right: 0;
  animation: borderInputAnim 10s infinite;
  z-index: 3;
  background-color: var(--color-background2);
}

input {
  width: 100%;
  height: 60px;
  background: transparent;
  color: var(--color-text);
  padding: 20px;
  font-size: 16px;
}

button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button > img {
  transition: all 0.1s;
  width: 24px;
  height: 24px;
}

button:hover > img {
  transition: all 0.1s;
  transform: scale(1.1);
}

.dark button img {
  filter: invert(1);
}

.light button img {
  filter: invert(0.5);
}
</style>
