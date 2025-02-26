<script setup lang="ts">
import { format } from "date-fns";
import type { FormSubmitEvent } from "#ui/types";
import {
  createTournamentSchema,
  type CreateTournamentSchema,
} from "~/schemas/tournament.schema.js";

const emit = defineEmits(["load-tournaments"]);
const props = defineProps<{
  id: string;
}>();

const toast = useToast();
const isOpen = ref(false);
const isLoading = ref(false);
const state = reactive({
  name: "",
  location: "",
  price: 0,
  maxTeams: 20,
  type: useTournament().typeOptions[0].value,
  seed: false,
  consolation: false,
  startDate: new Date(),
  endDate: new Date(),
  status: useTournament().statusOptions[0].value,
  difficulty: useTournament().difficultyOptions[0].value,
  category: useTournament().categoryOptions[0].value,
});

onUpdated(async () => {
  try {
    const response = await useTournament().show(props.id);
    if (response) {
      state.name = response.data.name;
      state.location = response.data.location;
      state.price = response.data.price;
      state.maxTeams = response.data.maxTeams;
      state.type = response.data.type;
      state.seed = response.data.seed;
      state.consolation = response.data.consolation;
      state.startDate = new Date(response.data.startDate);
      state.endDate = new Date(response.data.endDate);
      state.status = response.data.status;
      state.difficulty = response.data.difficulty;
      state.category = response.data.category;
    }
  } catch (error) {
    console.error(error);
  }
});

const onSubmit = async (event: FormSubmitEvent<CreateTournamentSchema>) => {
  isLoading.value = true;
  try {
    await useTournament().update(props.id, event.data);
    emit("load-tournaments");
    toast.add({
      title: "Tournoi modifié avec succès",
      color: "green",
    });
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Erreur lors de la modification du tournoi",
      color: "red",
    });
  }
  isLoading.value = false;
  isOpen.value = false;
};
</script>

<template>
  <div>
    <UButton size="lg" @click="isOpen = true">
      <UIcon name="i-heroicons-pencil" />
    </UButton>

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Modification d'un tournoi</h2>
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

          <UFormGroup label="Prix" name="price" required>
            <UInput v-model="state.price" type="number" />
          </UFormGroup>

          <UFormGroup label="Nombres d'équipes max" name="maxTeams" required>
            <UInput v-model="state.maxTeams" type="number" />
          </UFormGroup>

          <UFormGroup label="Type de tournois" name="status" required>
            <USelectMenu
              v-model="state.type"
              :options="useTournament().typeOptions"
              option-attribute="name"
              value-attribute="value"
            />
          </UFormGroup>

          <div class="flex gap-4 items-center">
            <UFormGroup class="w-6/12" label="Tête de série" name="status">
              <UToggle color="primary" v-model="state.seed" />
            </UFormGroup>
            <UFormGroup
              class="w-6/12"
              label="Consolante"
              name="consolation"
              v-if="state.type === 'bracket'"
            >
              <UToggle color="primary" v-model="state.consolation" />
            </UFormGroup>
          </div>

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
            Modifier le tournoi
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
