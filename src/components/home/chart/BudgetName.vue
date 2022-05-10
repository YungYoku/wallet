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
          type="button"
          v-for="budget in budgetsStore.budgets"
          :key="budget"
          @click="swapBudget(budget)"
        >
          {{ budget }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budgetWrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.budget-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.budget-nav {
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 10px;
  gap: 10px;
}

.budget-content {
  width: 300px;
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  z-index: 9;
}

.budget-div:hover .budget-content {
  display: block;
}

.budget-div:hover .budget-nav {
  background-color: #ffffff;
  color: #333333;
}

.budget-nav span {
  font-size: 16px;
  text-align: center;
}

.budget-nav span.arrow {
  transform: rotate(90deg);
}

.budget-div:hover .budget-nav span.arrow {
  transform: rotate(-90deg);
}

.budget-content button {
  width: 100%;
  display: block;
  padding: 10px;
  background-color: #333333;
  color: #ffffff;
}

.budget-div:hover .budget-content button:hover {
  background-color: #ffffff;
  color: #333333;
}
</style>
