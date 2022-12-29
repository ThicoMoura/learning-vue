import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not Found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !useUserStore().user) next({ name: "login" });

  if (to.name === "login" && useUserStore().user) next({ name: "home" });

  next();
});

export default router;
