import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  await authStore.me();
});
