<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  myName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :class="{
      messageRight: myName === name,
      messageLeft: myName !== name,
    }"
    class="messageWrap"
  >
    <div class="messageWrapWrap">
      <div class="nameAndDate">
        <h3 v-if="name !== myName">{{ name !== myName ? name : "" }}</h3>
        <h4>{{ date }}</h4>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style>
.messageWrap {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  user-select: none;
}

.messageLeft {
  justify-content: flex-start;
}

.messageRight {
  justify-content: flex-end;
}

.messageWrapWrap {
  display: inline;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  min-width: 52px;
  background-color: var(--color-background2);
  color: var(--color-text);
  user-select: text;
}

.messageWrapWrap:hover {
  background-color: var(--color-background-mute);
}

.nameAndDate {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.messageWrapWrap h3 {
  position: relative;
  top: 0;
  font-size: 15px;
  font-weight: 400;
  margin-right: 10px;
}

.messageWrapWrap:not(h3) {
  font-size: 20px;
  font-weight: 600;
}

.messageWrapWrap h4 {
  font-size: 15px;
  font-weight: 400;
}
</style>
