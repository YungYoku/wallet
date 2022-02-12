<script setup lang="ts">
import { computed } from "vue";
import ChatAreaMessage from "./ChatAreaMessage.vue";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";
import type { Message } from "@/interfaces/message";
import type { MessageDate } from "@/interfaces/messageData";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();

let chat = computed<Message[]>(() => {
  let _chat = budgetsStore.budget.chat;
  if (_chat) {
    _chat = _chat.reverse();
  }
  return _chat;
});

function dateFilter(date: MessageDate) {
  const hours = date.hours > 9 ? date.hours : "0" + date.hours;
  const minutes = date.minutes > 9 ? date.minutes : "0" + date.minutes;
  return hours + ":" + minutes;
}
</script>

<template>
  <div class="messagesWindowWrap">
    <chat-area-message
      v-for="message in chat"
      :key="message"
      :name="message.name"
      :date="dateFilter(message.date)"
      :myName="logsStore.name"
    >
      <h5>
        {{ message.message }}
      </h5>
    </chat-area-message>
  </div>
</template>

<style>
.messagesWindowWrap {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-direction: column-reverse;
  background-color: var(--color-background-soft);
}

.messagesWindowWrap::-webkit-scrollbar {
  width: 0;
}

.messagesWindowWrap::-webkit-scrollbar-track {
  background: transparent;
}

.messagesWindowWrap::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.messagesWindowWrap {
  scrollbar-width: none;
  scrollbar-color: transparent;
}
</style>
