<script lang="ts" setup>
import { computed } from "vue";
import ChatAreaMessage from "./ChatAreaMessage.vue";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";
import type { Message } from "@/interfaces/message";
import type { MessageDate } from "@/interfaces/messageData";
import BgLoading from "@/components/BgLoading.vue";
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();

function dateFilter(date: MessageDate) {
  const hours = date.hours > 9 ? date.hours : "0" + date.hours;
  const minutes = date.minutes > 9 ? date.minutes : "0" + date.minutes;
  return hours + ":" + minutes;
}

let chat = computed<Message[]>(() => {
  let _chat = budgetsStore.budget.chat;
  if (_chat) {
    _chat = _chat.reverse();
  }
  return _chat;
});
</script>

<template>
  <div class="messagesWindowWrap">
    <bg-loading v-if="loadingStore.loading" />

    <chat-area-message
      v-else
      v-for="message in chat"
      :key="message.message + dateFilter(message.date)"
      :date="dateFilter(message.date)"
      :myName="logsStore.name"
      :name="message.name"
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
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column-reverse;
  background-color: var(--color-background-soft);
}
</style>
