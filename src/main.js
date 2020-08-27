import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import firebase from "firebase";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL_3INew7ZuupE-1_vq0bj8CHkjOYjG7s",
  authDomain: "schedule-generator-6b4e0.firebaseapp.com",
  databaseURL: "https://schedule-generator-6b4e0.firebaseio.com",
  projectId: "schedule-generator-6b4e0",
  storageBucket: "schedule-generator-6b4e0.appspot.com",
  messagingSenderId: "912384130790",
  appId: "1:912384130790:web:ec0d5ecbbd88c5df8a4527",
  measurementId: "G-XS42QZ3YL8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
