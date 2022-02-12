<script setup lang="ts">
import { computed } from "vue";
import CategoriesAreaNewItem from "./CategoriesAreaNewItem.vue";
import CategoriesAreaItem from "./CategoriesAreaItem.vue";
import { useBudgetsStore } from "@/stores/budgets";
import type { Category } from "@/interfaces/category";

const budgetsStore = useBudgetsStore();

function nullifyPrice(categories: Category[]) {
  for (const category of categories) {
    category.price = 0;
  }
  return categories;
}

function sortCategories(categories: Category[]) {
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories.length - 1; j++) {
      if (categories[j].price < categories[j + 1].price) {
        let temp = categories[j];
        categories[j] = categories[j + 1];
        categories[j + 1] = temp;
      }
    }
  }
  return categories;
}

let categories = computed<Category[]>(() => {
  let _categories: Category[] = budgetsStore.budget.categories;

  if (budgetsStore.budget.categories && budgetsStore.budget.categories[0]) {
    _categories = nullifyPrice(_categories);

    for (const purchase of budgetsStore.budget.purchases) {
      for (const category of _categories) {
        if (category.name === purchase.category) {
          category.price += purchase.price;
        }
      }
    }
  }
  return sortCategories(_categories);
});
</script>

<template>
  <div class="categoriesArea">
    <categories-area-new-item></categories-area-new-item>

    <div class="areaItemsWrap">
      <div class="areaItems">
        <categories-area-item
          v-for="category in categories"
          :key="category"
          :color="category.color"
          :category="category.name"
          :price="category.price"
        ></categories-area-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categoriesArea {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: grid;
}

.areaItemsWrap {
  display: grid;
  overflow: hidden;
  border-radius: 10px;
}

.areaItems {
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: calc(100% + 8px);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
</style>
