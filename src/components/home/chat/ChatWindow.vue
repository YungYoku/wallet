<script lang="ts" setup>
import ChatArea from "./ChatArea.vue";
import ChatAreaInput from "./ChatAreaInput.vue";
</script>

<template>
  <div class="wrap">
    <chat-area />
    <chat-area-input />
  </div>
</template>

<style scoped>
.wrap {
  position: relative;

  display: grid;

  grid-template: calc(100% - 60px) 60px / 1fr;

  width: 100%;
  height: 100%;
  overflow: hidden;

  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}
</style>
