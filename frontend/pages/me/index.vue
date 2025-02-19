<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>
    <h1>Mon profil</h1>
    <p>{{ authStore.user?.firstname }}</p>
    <p>{{ authStore.user?.lastname }}</p>
    <p>{{ authStore.user?.email }}</p>
    <p>{{ authStore.user?.role }}</p>
  </div>
</template>
