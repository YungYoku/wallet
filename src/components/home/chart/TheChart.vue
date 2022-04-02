<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useBudgetsStore } from "@/stores/budgets";
import BudgetName from "@/components/home/chart/BudgetName.vue";
import type { ChartData } from "@/interfaces/chartData";

const budgetsStore = useBudgetsStore();

let diagram = ref();
let data = computed<ChartData[]>(() => {
  let _data: ChartData[] = [];
  if (
    budgetsStore.budget.categories &&
    budgetsStore.budget.categories[0] &&
    budgetsStore.budget.purchases &&
    budgetsStore.budget.purchases[0]
  ) {
    for (const obj of budgetsStore.budget.categories) {
      _data.push({
        radian: 0,
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
  return _data;
});

let vueCanvas: {
  clearRect: (arg0: number, arg1: number, arg2: number, arg3: number) => any;
  beginPath: () => any;
  arc: (
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number,
    arg4: number,
    arg5: boolean | undefined
  ) => any;
  closePath: () => any;
  stroke: () => any;
  fillStyle: string;
  fill: () => any;
  moveTo: (arg0: number, arg1: number) => any;
  save: () => any;
  translate: (arg0: number, arg1: number) => any;
  rotate: (arg0: any) => any;
  restore: () => any;
};

function startDrawing() {
  if (data.value && diagram.value) {
    diagram.value.width = diagram.value.offsetWidth;
    diagram.value.height = diagram.value.offsetHeight;
    vueCanvas = diagram.value.getContext("2d");
    vueCanvas.clearRect(0, 0, 800, 800);
    if (
      budgetsStore.budget.categories[0] &&
      budgetsStore.budget.purchases[0] &&
      diagram.value
    ) {
      drawRect();
    }
  }
}

onMounted(() => startDrawing());
watch(data, () => startDrawing());

async function drawRect() {
  vueCanvas.clearRect(0, 0, 800, 800);
  let previousRadian = 0;
  let middle = {
    x: diagram.value.offsetWidth / 2,
    y: diagram.value.offsetHeight / 2,
    radius: diagram.value.offsetHeight / 2,
  };

  await vueCanvas.beginPath();
  await vueCanvas.arc(
    middle.x,
    middle.y,
    middle.radius,
    0,
    2 * Math.PI,
    undefined
  );
  await vueCanvas.closePath();
  await vueCanvas.stroke();
  vueCanvas.fillStyle = "#cccccc";
  await vueCanvas.fill();

  let total = ref(0);
  for (const obj of data.value) {
    total.value += obj.value;
  }

  for (const obj of data.value) {
    previousRadian = previousRadian || 0;
    await vueCanvas.beginPath();
    vueCanvas.fillStyle = obj.color;
    obj.radian = Math.PI * 2 * (obj.value / total.value);
    await vueCanvas.moveTo(middle.x, middle.y);
    await vueCanvas.arc(
      middle.x,
      middle.y,
      middle.radius,
      previousRadian,
      previousRadian + obj.radian,
      false
    );
    await vueCanvas.closePath();
    await vueCanvas.fill();
    await vueCanvas.save();
    await vueCanvas.translate(middle.x, middle.y);
    vueCanvas.fillStyle = "#cccccc";
    await vueCanvas.rotate(previousRadian + obj.radian);
    await vueCanvas.restore();

    previousRadian += obj.radian;
  }
}
</script>

<template>
  <aside>
    <budget-name />
    <div v-if="budgetsStore.budget.balance" class="canvasWrap">
      <canvas ref="diagram" class="diagram" height="300" width="300"></canvas>
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
  user-select: none;
}

.canvasWrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyCircle {
  width: 300px;
  height: 300px;
  border: 5px solid #9966cc;
  border-radius: 50%;
}
</style>
