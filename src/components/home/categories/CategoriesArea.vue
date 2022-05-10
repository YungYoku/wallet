<script lang="ts" setup>
import { computed } from "vue";
import CategoriesAreaCreate from "./CategoriesAreaCreate.vue";
import CategoriesAreaItem from "./CategoriesAreaItem.vue";
import { useBudgetsStore } from "@/stores/budgets";
import type { Category } from "@/interfaces/category";
import BgLoading from "@/components/BgLoading.vue";
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
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
    <categories-area-create />

    <div class="areaItems">
      <bg-loading v-if="loadingStore.loading" />

      <categories-area-item
        v-else
        v-for="category in categories"
        :key="category.name + category.price"
        :category="category.name"
        :color="category.color"
        :price="category.price"
      />
    </div>
  </div>
</template>

<style scoped>
.categoriesArea {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: grid;
  grid-template: 100px auto / 1fr;
  grid-gap: 10px;
}

.areaItems {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
</style>
