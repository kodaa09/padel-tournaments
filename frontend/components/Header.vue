<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="mb-16">
    <div class="flex justify-between items-center container mx-auto py-8">
      <div>
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/">Padel Tournaments</NuxtLink>
        </h1>
      </div>
      <nav>
        <ul class="flex items-center gap-4" v-if="!authStore.user">
          <li>
            <SignupForm />
          </li>
          <li>
            <LoginForm />
          </li>
        </ul>
        <ul class="flex items-center gap-8" v-else>
          <li v-if="authStore.user?.role === 'admin'">
            <ULink
              to="/admin/tournaments"
              active-class="text-primary"
              inactive-class="text-black"
            >
              Tournois
            </ULink>
          </li>
          <li v-if="authStore.user?.role === 'admin'">
            <ULink
              to="/admin/users"
              active-class="text-primary"
              inactive-class="text-black"
            >
              Utilisateurs
            </ULink>
          </li>
          <li>
            <ULink
              to="/me"
              active-class="text-primary"
              inactive-class="text-black"
            >
              Mon profil
            </ULink>
          </li>
          <li>
            <UButton @click="authStore.logout">Déconnexion</UButton>
          </li>
        </ul>
      </nav>
    </div>
    <UDivider />
  </header>
</template>
