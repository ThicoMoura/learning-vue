import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      beforeEnter: [],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      beforeEnter: [],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Not Found",
      component: NotFoundView,
    },
  ],
});

router.beforeEach(async (to) => {
  const token = useAuthStore().token;

  if (to.name !== "Login" && (!token || token === "undefined"))
    return { name: "Login" };
  if (to.name === "Login" && token && token !== "undefined")
    return { name: "Home" };
});

export default router;
