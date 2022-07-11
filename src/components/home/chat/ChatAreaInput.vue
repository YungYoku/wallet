<script lang="ts" setup>
import { ref } from "vue";
import { db } from "@/main";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useBudgetsStore } from "@/stores/budgets";
import { useLogsStore } from "@/stores/logs";

const budgetsStore = useBudgetsStore();
const logsStore = useLogsStore();

const message = ref("");

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
  <form @submit.prevent="sendMessage">
    <input v-model.trim="message" placeholder="Сообщение" type="text" />
    <button type="submit">
      <img alt="Send" src="@/assets/img/send.svg" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
form {
  position: relative;
  right: 0;
  bottom: 0;
  z-index: 3;

  display: grid;
  align-items: center;

  grid-template: 100% / 1fr 50px;

  width: 100%;

  background-color: var(--color-background2);

  animation: borderInputAnim 10s infinite;

  input {
    width: 100%;
    height: 60px;
    padding: 20px;

    font-size: 16px;
    color: var(--color-text);

    background: transparent;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    img {
      width: 24px;
      height: 24px;

      transition: all 0.1s;
    }

    &:hover {
      img {
        transform: scale(1.1);
        transition: all 0.1s;
      }
    }
  }
}

.dark {
  form {
    button {
      img {
        filter: invert(1);
      }
    }
  }
}

.light {
  form {
    button {
      img {
        filter: invert(0.5);
      }
    }
  }
}
</style>
