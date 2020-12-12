import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Edit from "@/components/Edit";
import Chart from "@/components/Chart";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/schedule/", component: Login },
    { path: "/schedule/login", name: "Login", component: Login },
    {
      path: "/schedule/edit",
      name: "Edit",
      component: Edit,
      meta: { requiresAuth: true },
    },
    {
      path: "/schedule/chart",
      name: "Chart",
      component: Chart,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
