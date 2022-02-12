<script setup lang="ts">
import ChatArea from "./ChatArea.vue";
import ChatAreaInput from "./ChatAreaInput.vue";
</script>

<template>
  <div class="wrap">
    <chat-area></chat-area>
    <chat-area-input></chat-area-input>
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  position: relative;
  grid-template: calc(100% - 60px) 60px / 1fr;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}
</style>
