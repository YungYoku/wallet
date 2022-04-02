<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useLogsStore } from "@/stores/logs";

const logsStore = useLogsStore();

const form = reactive({
  email: "",
  pass: "",
  passRep: "",
  rules: false,
  isValid() {
    return (
      this.pass === this.passRep &&
      this.pass.length >= 6 &&
      this.email &&
      this.rules
    );
  },
});
const passDom = ref();
const passRepDom = ref();
const lineI = ref();
const lineII = ref();
const lineIII = ref();

const colors = {
  main: "#9966cc",
  additional: "#d3d3d3",
  error: "#E6414C",
  valid: "#50C970",
};

function changeComplexity() {
  if (form.pass.length >= 6 && form.passRep.length >= 6) {
    lineI.value.style.backgroundColor = colors.main;
  } else {
    lineI.value.style.backgroundColor = colors.additional;
    lineII.value.style.backgroundColor = colors.additional;
    lineIII.value.style.backgroundColor = colors.additional;
  }

  if (form.pass.length >= 10 && form.passRep.length >= 10) {
    lineII.value.style.backgroundColor = colors.main;
  } else {
    lineII.value.style.backgroundColor = colors.additional;
    lineIII.value.style.backgroundColor = colors.additional;
  }

  if (form.pass.length >= 14 && form.passRep.length >= 14) {
    lineIII.value.style.backgroundColor = colors.main;
  } else {
    lineIII.value.style.backgroundColor = colors.additional;
  }

  checkPass();
}

function checkPass() {
  if (form.pass === "" && form.passRep === "") {
    passDom.value.style.color = colors.additional;
    passRepDom.value.style.color = colors.additional;
  } else if (form.pass === form.passRep) {
    passDom.value.style.color = colors.valid;
    passRepDom.value.style.color = colors.valid;
  } else {
    passDom.value.style.color = colors.error;
    passRepDom.value.style.color = colors.error;
  }
}

async function register() {
  if (form.isValid()) {
    logsStore.register({
      email: form.email,
      pass: form.pass,
    });
  }
}
</script>

<template>
  <div class="registration">
    <h2>Регистрация</h2>

    <form @submit.prevent="register">
      <input
        v-model.trim="form.email"
        class="email inputLine"
        placeholder="Почта"
        type="text"
      />

      <input
        ref="passDom"
        v-model.trim="form.pass"
        class="pass inputLine"
        placeholder="Пароль"
        type="password"
        @keyup="changeComplexity"
      />

      <input
        ref="passRepDom"
        v-model.trim="form.passRep"
        class="passRep inputLine"
        placeholder="Повторите пароль"
        type="password"
        @keyup="changeComplexity"
      />

      <div class="passComplexity">
        <span ref="lineI" class="passComplexity__line"></span>
        <span ref="lineII" class="passComplexity__line"></span>
        <span ref="lineIII" class="passComplexity__line"></span>
      </div>

      <label class="rules">
        <input v-model="form.rules" type="checkbox" />
        Я соглсаен с правилами.
      </label>

      <button class="submitBtn" type="submit">Отправить</button>

      <router-link class="swapMode" to="/login">
        <h5>ЛОГИН</h5>
      </router-link>
    </form>
  </div>
</template>

<style scoped>
.registration {
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
  box-shadow: 0 0 10px 1px var(--color-shadow);
  display: grid;
  grid-template: 50px 50px 50px 40px 20px 90px 10px / 1fr;
}

h2 {
  font-size: 70px;
  font-weight: 500;
  color: #999999;
  text-align: center;
  margin: 0 0 60px 0;
}

.email,
.pass,
.passRep {
  font-size: 18px;
  transition: all 0.02s;
  user-select: text;
  color: var(--color-text);
  background: transparent;
}

.email:focus,
.pass:focus,
.passRep:focus {
  border-bottom: 2px solid #9966cc;
  transition: all 0.02s;
}

.passComplexity {
  display: grid;
  grid-template: 5px / 1fr 1fr 1fr;
  grid-gap: 5%;
}

.passComplexity__line {
  width: 100%;
  height: 5px;
  background-color: #d3d3d3;
  transition: all 0.5s;
}

.rules input {
  cursor: pointer;
}

.submitBtn {
  padding: 15px 0;
  background-color: #9966cc;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 24px;
  font-weight: 400;
  transition: all 0.3s;
  outline: none;
}

.submitBtn:hover {
  transform: scale(1.05);
  transition: all 0.3s;
  box-shadow: 0 4px 10px 1px var(--color-shadow);
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
