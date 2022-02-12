<script setup lang="ts">
import CategoriesArea from "@/components/home/categories/CategoriesArea.vue";
import ChatWindow from "@/components/home/chat/ChatWindow.vue";
import NewPurchase from "@/components/home/newPurchase/NewPurchase.vue";
import TheChart from "@/components/home/chart/TheChart.vue";
import FeedArea from "@/components/home/feed/FeedArea.vue";
</script>

<template>
  <main>
    <categories-area class="categories" />
    <chat-window class="chat" />
    <new-purchase class="purchase" />
    <the-chart class="chart" />
    <feed-area class="feed" />
  </main>
</template>

<style scoped>
main {
  padding: 20px 10px;
  display: grid;
  grid-template: calc(55vh - 120px) 45vh / 300px 3fr 1fr;
  grid-template-areas:
    "chart feed purchase"
    "categories feed chat";
  position: relative;
  grid-gap: 20px;
}

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
  grid-area: chat;
  width: 100%;
  height: 100%;
  position: relative;
}

@media (max-width: 1200px) {
  main {
    padding: 20px 10px;
    display: grid;
    grid-template: calc(55vh - 120px) 45vh / 300px 1fr 1fr;
    grid-template-areas:
      "chart categories purchase"
      "feed feed chat";
    overflow: hidden;
    position: relative;
    grid-gap: 20px;
  }
}

@media (max-width: 1024px) {
  main {
    padding: 20px 10px;
    display: grid;
    grid-template: calc(55vh - 120px) 45vh / 1fr 1fr 1fr;
    grid-template-areas:
      "chart categories purchase"
      "feed feed chat";
    overflow: hidden;
    position: relative;
    grid-gap: 20px;
  }
}
</style>
