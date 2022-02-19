<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBudgetsStore } from "@/stores/budgets";
import { useLoadingStore } from "@/stores/loading";

const budgetsStore = useBudgetsStore();
const loading = useLoadingStore();
const router = useRouter();

async function swapBudget(bid: string) {
  loading.show();
  budgetsStore.setBid(bid);
  await router.push("/");
  loading.hide();
}
</script>

<template>
  <div class="budgetWrap">
    <div class="budget-div">
      <div
        class="budget-nav"
        :style="{
          borderRadius: budgetsStore.budgets[1] ? '10px 10px 0 0' : '10px',
        }"
      >
        <span>
          {{ budgetsStore.budget.name ? budgetsStore.budget.name : "Бюджет" }}
        </span>
      </div>

      <div class="budget-content" v-if="budgetsStore.budgets[1]">
        <button
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
  user-select: none;
  z-index: 10;
  border-radius: 10px;
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
