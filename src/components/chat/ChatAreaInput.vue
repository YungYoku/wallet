<script setup lang="ts">
import { ref } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();

let message = ref<string>("");

function getDate() {
  return {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  };
}

function sendMessage() {
  if (message.value) {
    updateDoc(doc(db, "budgets", budgetsStore.id), {
      chat: arrayUnion({
        message: message.value,
        date: getDate(),
        name: logsStore.name,
      }),
    });
    message.value = "";
  }
}
</script>

<template>
  <form @submit.prevent="sendMessage()">
    <input type="text" v-model.trim="message" placeholder="Сообщение" />
    <button type="submit">
      <img src="../../assets/images/send.png" alt="Send" />
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
  font-size: 20px;
  user-select: text;
}

button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover > img {
  transition: all 0.1s;
  width: 32px;
  height: 32px;
}

button > img {
  transition: all 0.1s;
  width: 28px;
  height: 28px;
}
</style>
