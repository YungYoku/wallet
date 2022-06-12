<script lang="ts" setup>
import { reactive } from "vue";
import { useLogsStore } from "@/stores/logs";

const logsStore = useLogsStore();

const form = reactive({
  email: "",
  pass: "",
  isValid() {
    return this.pass.length >= 6 && this.email;
  },
});

async function login() {
  if (form.isValid()) {
    await logsStore.login({
      email: form.email,
      pass: form.pass,
    });
  }
}
</script>

<template>
  <div class="login">
    <h2>Логин</h2>

    <form @submit.prevent="login">
      <input
        v-model.trim="form.email"
        class="email inputLine"
        placeholder="Почта"
        type="text"
      />

      <input
        v-model.trim="form.pass"
        class="pass inputLine"
        placeholder="Пароль"
        type="password"
      />

      <button class="submitBtn" type="submit">Войти</button>

      <router-link class="swapMode" to="/reg">
        <h5>РЕГИСТРАЦИЯ</h5>
      </router-link>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
}

form {
  display: grid;
  justify-content: center;
  align-items: center;

  grid-template: 50px 50px 90px 10px / 1fr;

  width: 40%;
  min-width: 340px;
  max-width: 520px;
  padding: 30px 40px 20px 40px;

  color: var(--color-text);

  background-color: var(--color-background2);
  border-radius: 30px;
  box-shadow: 0 4px 10px 1px var(--color-shadow);
}

h2 {
  margin: 0 0 60px 0;

  font-size: 70px;
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
}

.email,
.pass {
  font-size: 18px;
  color: var(--color-text);

  background: transparent;

  transition: all 0.02s;

  user-select: text;
}

.email:focus,
.pass:focus {
  border-bottom: 2px solid #9966cc;

  transition: all 0.02s;
}

.submitBtn {
  padding: 10px 0;

  font-size: 24px;
  font-weight: 400;
  color: white;

  background-color: #9966cc;
  border: none;
  border-radius: 20px;
  outline: none;

  transition: all 0.3s;
}

.submitBtn:hover {
  box-shadow: 0 0 10px 1px var(--color-shadow);

  transform: scale(1.05);
  transition: all 0.3s;
}

.inputLine {
  border-top: none;
  border-right: none;
  border-bottom: 1px solid var(--color-border);
  border-left: none;
}

.swapMode {
  display: flex;
  justify-content: center;
}

h5 {
  position: relative;

  font-weight: 600;
  color: gray;

  cursor: pointer;
}

h5::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;

  width: 0;
  height: 2px;

  background-color: #9966cc;

  transition: all 0.2s;
}

h5:hover::after {
  width: 100%;

  transition: all 0.2s;
}

@media screen and (max-width: 768px) {
  h2 {
    font-size: 50px;
  }
}

@media screen and (max-width: 480px) {
  form {
    width: 80%;
    min-width: 300px;
    max-width: 520px;
    padding: 20px 20px 20px 20px;
  }

  section {
    width: 30%;
    min-width: 300px;
    padding: 30px 40px 20px 40px;
  }

  h2 {
    font-size: 40px;
  }
}
</style>
