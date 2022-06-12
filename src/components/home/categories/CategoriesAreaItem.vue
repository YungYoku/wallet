<script lang="ts" setup>
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
    <h3>{{ price }} ₽</h3>
  </div>
</template>

<style scoped>
.category {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: auto;
  margin-bottom: 10px;
  padding: 10px;

  color: var(--color-text);

  background-color: var(--color-background2);
  border-radius: 10px;
}

.category:hover {
  background-color: var(--color-background-mute);
}

.category div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.category h3 {
  font-size: 16px;
}

.category div div {
  width: 30px;
  height: 30px;
  margin-right: 10px;

  border-radius: 15px;
}
</style>
