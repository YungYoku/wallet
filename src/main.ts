import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/base.css";

import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhyZFpXOT_Skbw2opuqtyDI9OLfweR4vo",
  authDomain: "wallet-7e030.firebaseapp.com",
  projectId: "wallet-7e030",
  storageBucket: "wallet-7e030.appspot.com",
  messagingSenderId: "857150439401",
  appId: "1:857150439401:web:461620c5dab4efcf8b9578",
};

const fApp = initializeApp(firebaseConfig);
export const db = getFirestore(fApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
