<script setup lang="ts"></script>

<template>
  <div class="loadingWrap">
    <div class="loading">
      <div class="loadingCircle"></div>
    </div>
  </div>
</template>

<style scoped>
.loadingWrap {
  position: absolute;
  top: 84px;
  left: 0;
  width: 100%;
  min-height: calc(100vh - 84px);
  height: calc(100% - 84px);
  z-index: 8;
  background-color: var(--color-background2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  animation: circleRotate 1s linear infinite;
}

.loadingCircle {
  width: 50px;
  height: 50px;
  background-color: var(--color-heading);
  border-radius: 50%;
  position: relative;
  z-index: 9;
}

.loadingCircle::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 5px;
  left: 5px;
  background-color: var(--color-background2);
}

.loadingCircle::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: -20px;
  left: -20px;
  background-color: var(--color-background2);
}

@keyframes circleRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
