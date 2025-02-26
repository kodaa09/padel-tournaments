// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      // apiBase: "http://localhost:3333/api",
      apiBase: "http://preprod-padel.koodev.fr/api",
    },
  },
});
