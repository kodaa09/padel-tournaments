import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const me = await authStore.me();

  if (!me) {
    return navigateTo("/");
  }

  if (authStore.user?.role !== "admin") {
    return navigateTo("/");
  }
});
