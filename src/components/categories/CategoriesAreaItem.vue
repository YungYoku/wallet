<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="category">
    <div>
      <div
        :style="{
          backgroundColor: color,
        }"
      ></div>
      <h3>{{ category }}</h3>
    </div>
    <h3>Сумма: {{ price }}</h3>
  </div>
</template>

<style scoped>
.category {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: var(--color-background2);
  color: var(--color-text);
  user-select: none;
}

.category div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.category div div {
  border-radius: 15px;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
