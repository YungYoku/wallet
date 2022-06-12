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
    <div class="message">
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
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 10px;
}

.messageLeft {
  justify-content: flex-start;
}

.messageRight {
  justify-content: flex-end;
}

.message {
  position: relative;

  display: inline;

  min-width: 52px;
  padding: 10px;

  color: var(--color-text);

  background-color: var(--color-background2);
  border-radius: 10px;
}

.message:hover {
  background-color: var(--color-background-mute);
}

.nameAndDate {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.message h3 {
  position: relative;
  top: 0;

  margin-right: 10px;

  font-size: 14px;
  font-weight: 600;
}

.message h4 {
  font-size: 14px;
  font-weight: 400;
}

.message h5 {
  font-size: 16px;
  font-weight: 400;
}
</style>
