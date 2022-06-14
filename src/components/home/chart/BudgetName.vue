<script lang="ts" setup>
import { useBudgetsStore } from "@/stores/budgets";

const budgetsStore = useBudgetsStore();

function swapBudget(bid: string) {
  budgetsStore.setBid(bid);
}
</script>

<template>
  <div class="budgetWrap">
    <div class="budget-div">
      <div
        :style="{
          borderRadius: budgetsStore.budgets[1] ? '10px 10px 0 0' : '10px',
        }"
        class="budget-nav"
      >
        <span>
          {{ budgetsStore.budget.name ? budgetsStore.budget.name : "Бюджет" }}
        </span>
        <span class="arrow">></span>
      </div>

      <div v-if="budgetsStore.budgets[1]" class="budget-content">
        <button
          v-for="budget in budgetsStore.budgets"
          :key="budget"
          type="button"
          @click="swapBudget(budget)"
        >
          {{ budget }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.budgetWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  .budget-div {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    .budget-nav {
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

    .budget-content {
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

    &:hover .budget-content {
      display: block;
    }

    &:hover .budget-nav {
      color: #333333;

      background-color: #ffffff;
    }

    &:hover .budget-nav span.arrow {
      transform: rotate(-90deg);
    }

    &:hover .budget-content button:hover {
      color: #333333;

      background-color: #ffffff;
    }
  }
}
</style>
