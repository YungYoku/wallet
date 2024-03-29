<script lang="ts" setup>
import { computed } from "vue";
import { useBudgetsStore } from "@/stores/budgets";
import BudgetName from "@/components/home/chart/BudgetName.vue";
import type { ChartData } from "@/interfaces/chartData";
import BgLoading from "@/components/BgLoading.vue";
import { useLoadingStore } from "@/stores/loading";
import { ArcElement, Chart, PieController } from "chart.js";
import { Pie } from "vue-chartjs";

Chart.register(PieController, ArcElement);

const loadingStore = useLoadingStore();
const budgetsStore = useBudgetsStore();

const options = {
  responsive: true,
};

const data = computed<ChartData>(() => {
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
    labels: [],
    datasets: [
      {
        label: "График",
        data: values,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };
});
</script>

<template>
  <bg-loading v-if="loadingStore.loading" />

  <aside v-else>
    <budget-name />

    <div v-if="budgetsStore.budget.balance && data" class="canvasWrap">
      <pie :data="data" :height="300" :options="options" :width="300" />
    </div>

    <div v-else class="emptyCircle"></div>

    <span>Сумма: {{ budgetsStore.budget.balance }}</span>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  display: grid;

  grid-gap: 20px;
  grid-template: 40px 300px auto / 1fr;

  span {
    text-align: center;
  }

  .canvasWrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .emptyCircle {
    width: 300px;
    height: 300px;

    border: 2px solid #ffffff;
    border-radius: 50%;
  }
}
</style>
