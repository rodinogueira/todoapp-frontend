import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TasksView from "../views/TasksView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    { path: "/tasks", component: TasksView },
    { path: "/", redirect: "/login" },
  ],
});

// Middleware de autenticação
router.beforeEach((to, _, next) => {
  const auth = useAuthStore();

  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.isAuthenticated) {
    return next("/login");
  }

  if ((to.path === "/login" || to.path === "/register") && auth.isAuthenticated) {
    return next("/tasks");
  }

  next();
});

export default router;
