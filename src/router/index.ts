import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        layout: "StandardLayout",
        auth: true,
      },
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        layout: "EmptyLayout",
        auth: false,
      },
    },

    {
      path: "/reg",
      name: "Registration",
      component: () => import("@/views/RegView.vue"),
      meta: {
        layout: "EmptyLayout",
        auth: false,
      },
    },

    {
      path: "/create",
      name: "CreateBudget",
      component: () => import("@/views/CreateBudget.vue"),
      meta: {
        layout: "StandardLayout",
        auth: true,
      },
    },

    {
      path: "/join",
      name: "JoinBudget",
      component: () => import("@/views/JoinBudget.vue"),
      meta: {
        layout: "StandardLayout",
        auth: true,
      },
    },

    {
      path: "/404",
      name: "404",
      component: () => import("@/views/ErrorView.vue"),
      meta: {
        layout: "EmptyLayout",
        auth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const requireAuth = to.meta.auth;
  const logged = localStorage.uid;

  if (logged) {
    if (requireAuth) {
      return true;
    } else {
      return "/";
    }
  } else {
    if (requireAuth) {
      return "/login";
    } else {
      return true;
    }
  }
});

export default router;
