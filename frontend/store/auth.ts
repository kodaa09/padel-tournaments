import { defineStore } from "pinia";
import type { LoginSchema } from "~/schemas/auth.schema";

export const useAuthStore = defineStore("auth", () => {
  const user = useState("user", (): null | UserType => null);

  const authenticate = async (payload: LoginSchema) => {
    const { data, status, error } = await useFetch<{ data: UserType }>(
      "http://localhost:3333/api/auth/login",
      {
        method: "POST",
        body: payload,
        credentials: "include",
      }
    );

    if (status.value === "success" && data.value) {
      user.value = {
        id: data.value.data.id ?? null,
        licenseNumber: data.value.data.licenseNumber ?? null,
        firstname: data.value.data.firstname ?? null,
        lastname: data.value.data.lastname ?? null,
        email: data.value.data.email ?? null,
        role: data.value.data.role ?? null,
      };
    }

    return { status, error };
  };

  const me = async () => {
    const headers = useRequestHeaders(["cookie"]);
    const { data, status } = await useFetch<{ data: UserType }>(
      "http://localhost:3333/api/auth/me",
      {
        credentials: "include",
        headers,
      }
    );

    if (status.value === "success" && data.value?.data) {
      user.value = {
        id: data.value.data.id ?? null,
        licenseNumber: data.value.data.licenseNumber ?? null,
        firstname: data.value.data.firstname ?? null,
        lastname: data.value.data.lastname ?? null,
        email: data.value.data.email ?? null,
        role: data.value.data.role ?? null,
      };
      return true;
    }
    return false;
  };

  const logout = async () => {
    const { status } = await useFetch("http://localhost:3333/api/auth/logout", {
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
  licenseNumber: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: string | null;
};
