<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import {
  registerTournamentSchema,
  type RegisterTournamentSchema,
} from "~/schemas/tournament.schema.js";
import { useAuthStore } from "~/store/auth";

const props = defineProps<{
  tournamentId: string;
}>();
const emit = defineEmits(["register-error"]);
const authStore = useAuthStore();

const isRegisterLoading = ref(false);
const isSearchLoading = ref(false);
const isOpen = ref(false);
const isTeammateAccount = ref(true);
const teammate = ref<User | null>(null);
const isMakeTeam = ref(false);
const searchByLicenseNumber = ref("");
const state = reactive({
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  licenseNumber: "",
});

const resetForm = () => {
  isMakeTeam.value = false;
  teammate.value = null;
  searchByLicenseNumber.value = "";
};

const onSubmit = async (event: FormSubmitEvent<RegisterTournamentSchema>) => {
  console.log(event);
};

const onSearchByLicenseNumber = async () => {
  isSearchLoading.value = true;
  isMakeTeam.value = false;
  const user = await useUser().showByLicenseNumber(searchByLicenseNumber.value);
  if (user.status === "success") {
    teammate.value = user.data;
  }
  isSearchLoading.value = false;
};

const onRegister = async () => {
  if (authStore.user) {
    isOpen.value = true;
  } else {
    emit("register-error");
  }
};

const onRegisterTournament = async () => {
  isRegisterLoading.value = true;
  const team = await useTeam().store({
    player1Id: authStore.user?.id,
    player2Id: teammate.value?.id,
    tournamentId: props.tournamentId,
    name: teamName.value,
  });
  onCloseModal();
  isRegisterLoading.value = false;
};

const teamName = computed(() => {
  return `Team: ${authStore.user?.lastname} - ${teammate.value?.lastname}`;
});

const onCloseModal = () => {
  isOpen.value = false;
  resetForm();
};
</script>

<template>
  <div>
    <UButton label="S'inscrire" @click="onRegister" />

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
              S'inscrire à un tournoi
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="onCloseModal"
            />
          </div>
        </template>

        <div class="flex items-center gap-4 mb-5">
          <h2 class="text-sm">Votre coéquipier à déjà un compte ?</h2>
          <UToggle v-model="isTeammateAccount" />
        </div>

        <div v-if="isTeammateAccount">
          <div class="flex items-end gap-2 mb-5">
            <UFormGroup
              class="w-9/12"
              label="Numéro de licence"
              name="licenseNumber"
              required
            >
              <UInput
                v-model="searchByLicenseNumber"
                placeholder="Rechercher par numéro de licence..."
                icon="i-heroicons-magnifying-glass-20-solid"
              />
            </UFormGroup>
            <div class="w-2/12">
              <UButton
                @click="onSearchByLicenseNumber"
                :loading="isSearchLoading"
              >
                Rechercher
              </UButton>
            </div>
          </div>
          <UCard class="mb-8" v-if="teammate">
            <div class="flex items-center gap-4 justify-between">
              <div class="flex items-center gap-4">
                <div>
                  <UIcon name="i-heroicons-user-circle" class="w-10 h-10" />
                </div>
                <div>
                  <p>{{ teammate?.firstname }} {{ teammate?.lastname }}</p>
                  <p>{{ teammate?.licenseNumber }}</p>
                  <p>{{ teammate?.email }}</p>
                </div>
              </div>
              <div class="flex flex-col gap-2 items-start">
                <UButton
                  @click="isMakeTeam = true"
                  icon="i-heroicons-plus"
                  size="2xs"
                />
                <UButton
                  @click="isMakeTeam = false"
                  color="red"
                  icon="i-heroicons-x-mark"
                  size="2xs"
                  v-if="isMakeTeam"
                />
              </div>
            </div>
          </UCard>
          <div v-if="isMakeTeam">
            <h3 class="text-lg font-semibold mb-2">{{ teamName }}</h3>
            <div class="flex items-center gap-4">
              <UCard class="w-6/12">
                <div>
                  <UIcon name="i-heroicons-user-circle" class="w-10 h-10" />
                </div>
                <div>
                  <p>{{ teammate?.firstname }} {{ teammate?.lastname }}</p>
                  <p>{{ teammate?.licenseNumber }}</p>
                  <p>{{ teammate?.email }}</p>
                </div>
              </UCard>
              <UCard class="w-6/12">
                <div>
                  <UIcon name="i-heroicons-user-circle" class="w-10 h-10" />
                </div>
                <div>
                  <p>
                    {{ authStore.user?.firstname }}
                    {{ authStore.user?.lastname }}
                  </p>
                  <p>{{ authStore.user?.licenseNumber }}</p>
                  <p>{{ authStore.user?.email }}</p>
                </div>
              </UCard>
            </div>
            <UButton class="!mt-6" @click="onRegisterTournament" block>
              S'inscrire au tournoi
            </UButton>
          </div>
        </div>

        <UForm
          :schema="registerTournamentSchema"
          :state="state"
          class="space-y-4"
          v-if="!isTeammateAccount"
          @submit="onSubmit"
        >
          <div class="flex gap-4">
            <UFormGroup class="w-6/12" label="Prénom" name="firstname" required>
              <UInput v-model="state.firstname" />
            </UFormGroup>

            <UFormGroup class="w-6/12" label="Nom" name="lastname" required>
              <UInput v-model="state.lastname" />
            </UFormGroup>
          </div>

          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Téléphone" name="phone" required>
            <UInput v-model="state.phone" />
          </UFormGroup>

          <UFormGroup label="Numéro de licence" name="licenseNumber" required>
            <UInput v-model="state.licenseNumber" />
          </UFormGroup>

          <UButton class="!mt-6" type="submit" block>
            S'inscrire au tournoi
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
