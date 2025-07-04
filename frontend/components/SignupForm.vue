<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { signupSchema, type SignupSchema } from "~/schemas/auth.schema";

const endpoint = useRuntimeConfig().public.apiBase;

const initialState = {
  licenseNumber: undefined,
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined,
};

const toast = useToast();
const isOpen = ref(false);
const state = reactive(initialState);
const errorMessage = ref("");
const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<SignupSchema>) {
  isLoading.value = true;

  const { status, error } = await useFetch(`${endpoint}/auth/signup`, {
    method: "POST",
    body: {
      ...event.data,
      licenseNumber: event.data.licenseNumber.toString(),
    },
    credentials: "include",
  });

  isLoading.value = false;

  if (status.value === "success") {
    resetForm();
    toast.add({ title: "Inscription réussie" });
  } else {
    errorMessage.value = error.value?.data.message;
  }
}

const resetForm = () => {
  isOpen.value = false;
  state.licenseNumber = undefined;
  state.lastname = undefined;
  state.firstname = undefined;
  state.email = undefined;
  state.password = undefined;
};
</script>

<template>
  <div>
    <UButton label="Inscription" color="gray" @click="isOpen = true" />

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
              Inscription
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="resetForm()"
            />
          </div>
        </template>

        <UForm
          :schema="signupSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Numéro de licence" name="licenseNumber" required>
            <UInput v-model="state.licenseNumber" type="number" />
          </UFormGroup>

          <UFormGroup label="Prénom" name="firstname" required>
            <UInput v-model="state.firstname" />
          </UFormGroup>

          <UFormGroup label="Nom" name="lastname" required>
            <UInput v-model="state.lastname" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Mot de passe" name="password" required>
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

          <UButton class="!mt-6" type="submit" :loading="isLoading">
            S'inscrire
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
