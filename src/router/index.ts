import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { auth } from "@/plugins";

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
  const token = sessionStorage.getItem("tk");
  let status;

  if (token) {
    status = await auth(token)
      .get("/auth")
      .catch((err) => {
        return err.response.status;
      });
  }

  if (
    to.name !== "Login" &&
    (!token || token === "undefined" || status == 401)
  ) {
    if (token) {
      sessionStorage.removeItem("tk");
    }
    return { name: "Login" };
  }
  if (to.name === "Login" && token && token !== "undefined" && status != 401)
    return { name: "Home" };
});

export default router;
