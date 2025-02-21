<script setup lang="ts">
import { format } from "date-fns";
import type { FormSubmitEvent } from "#ui/types";
import {
  createTournamentSchema,
  type CreateTournamentSchema,
} from "~/schemas/tournament.schema.js";

const emit = defineEmits(["load-tournaments"]);

const toast = useToast();
const isOpen = ref(false);
const isLoading = ref(false);
const state = reactive({
  name: "",
  location: "",
  startDate: new Date(),
  endDate: new Date(),
  status: useTournament().statusOptions[0].value,
  difficulty: useTournament().difficultyOptions[0].value,
  category: useTournament().categoryOptions[0].value,
});

const onSubmit = async (event: FormSubmitEvent<CreateTournamentSchema>) => {
  isLoading.value = true;
  try {
    await useTournament().store(event.data);
    emit("load-tournaments");
    toast.add({
      title: "Tournoi créé avec succès",
      color: "green",
    });
  } catch (error) {
    toast.add({
      title: "Erreur lors de la création du tournoi",
      color: "red",
    });
  }
  isLoading.value = false;
  isOpen.value = false;
};
</script>

<template>
  <div>
    <UButton label="Créer un tournoi" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Création d'un tournoi</h2>
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
          :schema="createTournamentSchema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Nom du tournoi" name="name" required>
            <UInput v-model="state.name" />
          </UFormGroup>

          <UFormGroup label="Localisation du tournoi" name="location" required>
            <UInput v-model="state.location" />
          </UFormGroup>

          <div class="flex gap-4">
            <UFormGroup
              class="w-6/12"
              label="Date de début"
              name="startDate"
              required
            >
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton
                  class="w-full flex items-center justify-center"
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(state.startDate, 'd MMM, yyy')"
                />

                <template #panel="{ close }">
                  <DatePicker
                    v-model="state.startDate"
                    mode="dateTime"
                    hide-time-header
                    is-required
                    @close="close"
                  />
                </template>
              </UPopover>
            </UFormGroup>

            <UFormGroup
              class="w-6/12"
              label="Date de fin"
              name="endDate"
              required
            >
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton
                  class="w-full flex items-center justify-center"
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(state.endDate, 'd MMM, yyy')"
                />

                <template #panel="{ close }">
                  <DatePicker
                    v-model="state.endDate"
                    mode="dateTime"
                    hide-time-header
                    is-required
                    @close="close"
                  />
                </template>
              </UPopover>
            </UFormGroup>
          </div>

          <div class="flex gap-4">
            <UFormGroup class="w-4/12" label="Status" name="status" required>
              <USelectMenu
                v-model="state.status"
                :options="useTournament().statusOptions"
                option-attribute="name"
                value-attribute="value"
              />
            </UFormGroup>

            <UFormGroup
              class="w-4/12"
              label="Difficulté"
              name="difficulty"
              required
            >
              <USelectMenu
                v-model="state.difficulty"
                :options="useTournament().difficultyOptions"
                option-attribute="name"
                value-attribute="value"
              />
            </UFormGroup>

            <UFormGroup
              class="w-4/12"
              label="Catégorie"
              name="category"
              required
            >
              <USelectMenu
                v-model="state.category"
                :options="useTournament().categoryOptions"
                option-attribute="name"
                value-attribute="value"
              />
            </UFormGroup>
          </div>

          <UButton class="!mt-6" type="submit" :loading="isLoading" block>
            Créer le tournoi
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
