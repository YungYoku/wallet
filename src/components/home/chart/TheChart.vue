<script lang="ts" setup>
import { computed, ref } from "vue";
import { useBudgetsStore } from "@/stores/budgets";
import BudgetName from "@/components/home/chart/BudgetName.vue";
import type { ChartData } from "@/interfaces/chartData";
import BgLoading from "@/components/BgLoading.vue";
import { useLoadingStore } from "@/stores/loading";
import { PieChart } from "vue-chart-3";

import { ArcElement, Chart, PieController } from "chart.js";

Chart.register(PieController, ArcElement);

const loadingStore = useLoadingStore();
const budgetsStore = useBudgetsStore();

const options = ref({
  responsive: true,
});

let data = computed<ChartData>(() => {
  let _data = [];
  if (
    budgetsStore.budget.categories &&
    budgetsStore.budget.categories[0] &&
    budgetsStore.budget.purchases &&
    budgetsStore.budget.purchases[0]
  ) {
    for (const obj of budgetsStore.budget.categories) {
      _data.push({
        value: +obj.price,
        color: obj.color,
      });
    }

    let i = 0;
    for (const obj of budgetsStore.budget.purchases) {
      if (_data[i]) {
        if (_data[i].color === obj.color) {
          _data[i].value += +obj.price;
        }
      }
      i++;
    }
  }

  const values: number[] = [];
  const backgroundColors: string[] = [];
  _data = _data.filter((item) => item.value);
  _data.forEach((item) => {
    values.push(item.value);
    backgroundColors.push(item.color);
  });

  return {
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
      },
    ],
  };
});
</script>

<template>
  <bg-loading v-if="loadingStore.loading" />

  <aside v-else>
    <budget-name />

    <div v-if="budgetsStore.budget.balance" class="canvasWrap">
      <pie-chart
        :options="options"
        :chartData="data"
        :width="300"
        :height="300"
      />
    </div>

    <div v-else class="emptyCircle"></div>

    <span>Сумма: {{ budgetsStore.budget.balance }}</span>
  </aside>
</template>

<style scoped>
aside {
  display: grid;
  grid-template: 40px 300px auto / 1fr;
  grid-gap: 20px;
}

span {
  text-align: center;
}

.canvasWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyCircle {
  width: 300px;
  height: 300px;
  border: 2px solid #ffffff;
  border-radius: 50%;
}
</style>
