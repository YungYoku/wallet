<script lang="ts" setup></script>

<template>
  <div class="loading"></div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-image: linear-gradient(
    90deg,
    var(--color-background),
    var(--color-background-soft),
    var(--color-background),
    var(--color-background-soft)
  );
  background-size: 300% 100%;
  border-radius: 10px;

  animation: 1s loading linear infinite;

  @keyframes loading {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}
</style>
