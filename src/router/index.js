import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Edit from "@/components/Edit";
import Chart from "@/components/Chart";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: Login },
    { path: "/login", name: "Login", component: Login },
    { path: "/edit", name: "Edit", component: Edit },
    { path: "/chart", name: "Chart", component: Chart },
  ],
});

export default router;
