<script lang="ts" setup></script>

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
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid var(--color-loading);
  border-radius: 50%;
  position: relative;
  z-index: 9;
}

.loadingCircle::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  left: -10px;
  background-color: var(--color-background2);
  animation: bgRotate 1s linear infinite alternate;
}

@keyframes circleRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bgRotate {
  from {
    width: 20px;
    height: 20px;
    top: -10px;
    left: -10px;
  }
  to {
    width: 70px;
    height: 70px;
    top: -40px;
    left: -40px;
  }
}
</style>
