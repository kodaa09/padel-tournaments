export function useTeam() {
  const config = useRuntimeConfig();

  async function store(body: any) {
    const team = await $fetch(`${config.public.apiBase}/teams`, {
      method: "POST",
      body,
      credentials: "include",
    });
    return team;
  }

  return {
    store,
  };
}
