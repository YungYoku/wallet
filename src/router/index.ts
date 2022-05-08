import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
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
      component: () => import("@/views/Page404.vue"),
      meta: {
        layout: "EmptyLayout",
        auth: true,
      },
    },
  ],
});

router.resolve({
  name: "404",
  params: { pathMatch: ["404"] },
}).href;

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  const logged = localStorage.uid;

  if (logged) {
    if (requireAuth) {
      next();
    } else {
      next("/");
    }
  } else {
    if (requireAuth) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
