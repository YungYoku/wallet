<script setup lang="ts">
import CategoriesArea from "@/components/categories/CategoriesArea.vue";
import ChatWindow from "@/components/chat/ChatWindow.vue";
import NewPurchase from "@/components/newPurchase/NewPurchase.vue";
import TheChart from "@/components/budget/TheChart.vue";
import FeedArea from "@/components/feed/FeedArea.vue";
</script>

<template>
  <main>
    <categories-area class="categories" />
    <chat-window class="chat" />
    <new-purchase class="newPurchase" />
    <the-chart class="canvasWrap" />
    <feed-area class="feed" />
  </main>
</template>

<style scoped>
main {
  padding: 20px 10px;
  display: grid;
  grid-template: calc(55vh - 120px) 45vh / 1fr 4fr 2fr;
  grid-template-areas:
    "diagram feed categories"
    "newPurchase feed chat";
  position: relative;
  grid-gap: 20px;
}

.canvasWrap {
  grid-area: diagram;
}

.feed {
  grid-area: feed;
  border-radius: 10px;
}

.categories {
  grid-area: categories;
}

.newPurchase {
  grid-area: newPurchase;
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
    grid-template: calc(55vh - 120px) 45vh / 1fr 1fr 1fr;
    grid-template-areas:
      "diagram categories newPurchase"
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
      "diagram categories newPurchase"
      "feed feed chat";
    overflow: hidden;
    position: relative;
    grid-gap: 20px;
  }
}
</style>
