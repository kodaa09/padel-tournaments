<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="py-8">
    <div class="flex justify-between items-center">
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
        <ul class="flex items-center gap-4" v-else>
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
            <UButton color="black" @click="authStore.logout"
              >Déconnexion</UButton
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
