<script lang="ts" setup></script>

<template>
  <div class="loading"></div>
</template>

<style scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    90deg,
    var(--color-background),
    var(--color-background-soft),
    var(--color-background),
    var(--color-background-soft)
  );
  background-size: 300% 100%;
  animation: 1s loading linear infinite;
  border-radius: 10px;
}

@keyframes loading {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
