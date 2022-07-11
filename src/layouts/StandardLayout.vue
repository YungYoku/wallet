<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <div>
    <the-header />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: grid;

  grid-template: 60px calc(100vh - 60px) / 1fr;
}
</style>
