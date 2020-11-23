import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import firebase from "firebase";
import vuetify from "./plugins/vuetify";
import VueGAPI from "vue-gapi";
import axios from "axios";

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

const apiConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  clientId: process.env.VUE_APP_CLIENTID,
  discoveryDocs: [process.env.VUE_APP_DISCOVERYDOCS],
  scope: process.env.VUE_APP_SCOPE,
};
Vue.use(VueGAPI, apiConfig);

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");
