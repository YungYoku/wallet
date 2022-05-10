<script lang="ts" setup></script>

<template>
  <div>
    <h3>Имя</h3>
    <h3>Название</h3>
    <h3>Категория</h3>
    <h3>Цена</h3>
  </div>
</template>

<style scoped>
div {
  height: 50px;
  display: grid;
  grid-template: 30px / 2fr 2fr 2fr 2fr 32px;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 10px 10px 0 0;
  background-color: var(--color-background2);
}

h3 {
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
}
</style>
