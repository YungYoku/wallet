<script lang="ts" setup></script>

<template>
  <div>
    <h3>Имя</h3>
    <h3>Название</h3>
    <h3>Категория</h3>
    <h3>Цена</h3>
  </div>
</template>

<style lang="scss" scoped>
div {
  display: grid;
  align-items: center;

  grid-gap: 10px;
  grid-template: 30px / 2fr 2fr 2fr 2fr 32px;

  height: 50px;
  padding: 10px 20px 10px 10px;

  background-color: var(--color-background2);
  border-radius: 10px 10px 0 0;
  justify-items: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
  }
}
</style>
