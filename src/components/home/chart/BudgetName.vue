<script lang="ts" setup>
import { computed } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

const borderRadius = computed(() => {
  if (budgetsStore.budgets.length > 1) {
    return "10px 10px 0 0";
  }

  return "10px";
});

async function swapBudget(bid: string) {
  await budgetsStore.swapBudget(bid);
}
</script>

<template>
  <div class="budget">
    <div class="budget__content">
      <div
        :style="{
          borderRadius,
        }"
        class="budget__content-nav"
      >
        <span>
          {{ budgetsStore.budget.name }}
        </span>

        <span class="arrow">></span>
      </div>

      <div
        v-if="budgetsStore.budgets.length > 1"
        class="budget__content-buttons"
      >
        <button
          v-for="budget in budgetsStore.budgets"
          :key="budget"
          type="button"
          @click="swapBudget(budget)"
        >
          {{ budget.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.budget {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  &__content {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    &-nav {
      z-index: 10;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 300px;
      height: 100%;

      border-radius: 10px;
      gap: 10px;

      span {
        font-size: 16px;
        text-align: center;
      }

      span.arrow {
        transform: rotate(90deg);
      }
    }

    &-buttons {
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 9;

      display: none;

      width: 300px;
      overflow: hidden;

      border-radius: 0 0 10px 10px;

      button {
        display: block;

        width: 100%;
        padding: 10px;

        color: #ffffff;

        background-color: #333333;
      }
    }

    &:hover &-buttons {
      display: block;
    }

    &:hover &-nav {
      color: #333333;

      background-color: #ffffff;
    }

    &:hover &-nav span.arrow {
      transform: rotate(-90deg);
    }

    &:hover &-buttons button:hover {
      color: #333333;

      background-color: #ffffff;
    }
  }
}
</style>
