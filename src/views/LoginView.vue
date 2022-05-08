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
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

form {
  min-width: 340px;
  width: 40%;
  max-width: 520px;
  justify-content: center;
  align-items: center;
  padding: 30px 40px 20px 40px;
  border-radius: 30px;
  background-color: var(--color-background2);
  color: var(--color-text);
  box-shadow: 0 4px 10px 1px var(--color-shadow);
  display: grid;
  grid-template: 50px 50px 90px 10px / 1fr;
}

h2 {
  font-size: 70px;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
  margin: 0 0 60px 0;
}

.email,
.pass {
  font-size: 18px;
  transition: all 0.02s;
  user-select: text;
  color: var(--color-text);
  background: transparent;
}

.email:focus,
.pass:focus {
  border-bottom: 2px solid #9966cc;
  transition: all 0.02s;
}

.submitBtn {
  padding: 10px 0;
  background-color: #9966cc;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 24px;
  font-weight: 400;
  transition: all 0.3s;
  outline: none;
}

.submitBtn:hover {
  transform: scale(1.05);
  transition: all 0.3s;
  box-shadow: 0 0 10px 1px var(--color-shadow);
}

.inputLine {
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid var(--color-border);
}

.swapMode {
  display: flex;
  justify-content: center;
}

h5 {
  font-weight: 600;
  color: gray;
  position: relative;
  cursor: pointer;
}

h5::after {
  content: "";
  position: absolute;
  background-color: #9966cc;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
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
    min-width: 300px;
    width: 80%;
    max-width: 520px;
    padding: 20px 20px 20px 20px;
  }

  section {
    width: 30%;
    padding: 30px 40px 20px 40px;
    min-width: 300px;
  }

  h2 {
    font-size: 40px;
  }
}
</style>
