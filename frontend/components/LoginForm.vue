<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { loginSchema, type LoginSchema } from "~/schemas/auth.schema";
import { useAuthStore } from "~/store/auth";

const toast = useToast();
const authStore = useAuthStore();
const isOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  isLoading.value = true;

  const { status, error } = await authStore.authenticate(event.data);
  if (status.value === "success") {
    toast.add({ title: "Connexion réussie" });
  } else {
    errorMessage.value = error.value?.data.message;
  }

  isLoading.value = false;
}
</script>

<template>
  <div>
    <UButton label="Connexion" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Connexion
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UForm
          :schema="loginSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Mot de passe" name="password" required>
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

          <UButton class="!mt-6" type="submit" :loading="isLoading">
            Se connecter
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
