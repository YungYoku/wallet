<script lang="ts" setup>
import CategoriesArea from "@/components/home/categories/CategoriesArea.vue";
import ChatWindow from "@/components/home/chat/ChatWindow.vue";
import NewPurchase from "@/components/home/purchase/NewPurchase.vue";
import BudgetChart from "@/components/home/chart/BudgetChart.vue";
import FeedArea from "@/components/home/feed/FeedArea.vue";
</script>

<template>
  <main>
    <categories-area class="categories" />
    <chat-window class="chat" />
    <new-purchase class="purchase" />
    <budget-chart class="chart" />
    <feed-area class="feed" />
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;

  display: grid;

  grid-gap: 20px;
  grid-template: calc(55vh - 120px) 45vh / 300px 3fr 1fr;
  grid-template-areas:
    "chart feed purchase"
    "categories feed chat";

  padding: 20px 10px;

  .chart {
    grid-area: chart;
  }

  .feed {
    grid-area: feed;

    border-radius: 10px;
  }

  .categories {
    grid-area: categories;
  }

  .purchase {
    grid-area: purchase;
  }

  .chat {
    position: relative;

    grid-area: chat;

    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    position: relative;

    display: grid;

    grid-gap: 20px;
    grid-template: calc(55vh - 120px) 45vh / 300px 1fr 1fr;
    grid-template-areas:
      "chart categories purchase"
      "feed feed chat";

    padding: 20px 10px;
    overflow: hidden;
  }

  @media (max-width: 1024px) {
    position: relative;

    display: grid;

    grid-gap: 20px;
    grid-template: calc(55vh - 120px) 45vh / 1fr 1fr 1fr;
    grid-template-areas:
      "chart categories purchase"
      "feed feed chat";

    padding: 20px 10px;
    overflow: hidden;
  }
}
</style>
