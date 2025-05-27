import { defineStore } from "pinia";
import type { LoginSchema } from "~/schemas/auth.schema";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const user = useState("user", (): null | UserType => null);

  const authenticate = async (payload: LoginSchema) => {
    const { data, status, error } = await useFetch<{ data: UserType }>(
      `${config.public.apiBase}/auth/login`,
      {
        method: "POST",
        body: payload,
        credentials: "include",
      }
    );

    if (status.value === "success" && data.value) {
      user.value = {
        id: data.value.data.id ?? null,
        email: data.value.data.email ?? null,
        role: data.value.data.role ?? null,
      };
    }

    return { status, error };
  };

  const me = async () => {
    const headers = useRequestHeaders(["cookie"]);
    const { data, status } = await useFetch<{ data: UserType }>(
      `${config.public.apiBase}/auth/me`,
      {
        credentials: "include",
        headers,
      }
    );

    if (status.value === "success" && data.value?.data) {
      user.value = {
        id: data.value.data.id ?? null,
        email: data.value.data.email ?? null,
        role: data.value.data.role ?? null,
      };
      return true;
    }
    return false;
  };

  const logout = async () => {
    const { status } = await useFetch(`${config.public.apiBase}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (status.value === "success") {
      user.value = null;
      navigateTo("/");
    }
  };

  return { user, authenticate, logout, me };
});

export type UserType = {
  id: string | null;
  email: string | null;
  role: string | null;
};
