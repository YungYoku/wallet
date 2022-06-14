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
        <span ref="lineI" class="passComplexityLine"></span>
        <span ref="lineII" class="passComplexityLine"></span>
        <span ref="lineIII" class="passComplexityLine"></span>
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

<style lang="scss" scoped>
.registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  h2 {
    margin: 0 0 60px 0;

    font-size: 70px;
    font-weight: 500;
    text-align: center;
    color: var(--color-text);

    @media screen and (max-width: 768px) {
      font-size: 50px;
    }

    @media screen and (max-width: 480px) {
      font-size: 40px;
    }
  }

  form {
    display: grid;
    justify-content: center;
    align-items: center;

    grid-template: 50px 50px 50px 40px 20px 90px 10px / 1fr;

    width: 40%;
    min-width: 340px;
    max-width: 520px;
    padding: 30px 40px 20px 40px;

    color: var(--color-text);

    background-color: var(--color-background2);
    border-radius: 30px;
    box-shadow: 0 0 10px 1px var(--color-shadow);

    @media screen and (max-width: 480px) {
      width: 80%;
      min-width: 300px;
      max-width: 520px;
      padding: 20px 20px 20px 20px;
    }

    .email,
    .pass,
    .passRep {
      font-size: 18px;
      color: var(--color-text);

      background: transparent;

      transition: all 0.02s;

      user-select: text;

      &:focus {
        border-bottom: 2px solid #9966cc;

        transition: all 0.02s;
      }
    }

    .passComplexity {
      display: grid;

      grid-gap: 5%;
      grid-template: 5px / 1fr 1fr 1fr;

      .passComplexityLine {
        width: 100%;
        height: 5px;

        background-color: #d3d3d3;

        transition: all 0.5s;
      }
    }

    .rules {
      input {
        cursor: pointer;
      }
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

      &:hover {
        box-shadow: 0 4px 10px 1px var(--color-shadow);

        transform: scale(1.05);
        transition: all 0.3s;
      }
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

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;

        width: 0;
        height: 2px;

        background-color: #9966cc;

        transition: all 0.2s;
      }

      &:hover::after {
        width: 100%;

        transition: all 0.2s;
      }
    }
  }
}
</style>
