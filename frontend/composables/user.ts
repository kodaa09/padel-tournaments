export function useUser() {
  const config = useRuntimeConfig();

  async function showByLicenseNumber(licenseNumber: string) {
    const user = await $fetch<UserResponse>(
      `${config.public.apiBase}/users/license-number/${licenseNumber}`,
      {
        credentials: "include",
      }
    );
    return user;
  }

  return {
    showByLicenseNumber,
  };
}

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  licenseNumber: string;
};

export type UserResponse = {
  status: string;
  message: string;
  data: User;
};
