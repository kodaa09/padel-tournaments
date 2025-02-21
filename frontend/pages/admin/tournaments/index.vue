<script setup lang="ts">
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const tournaments = ref<Tournament[] | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  await loadTournaments();
});

const onloadTournaments = async () => {
  await loadTournaments();
};

const onDeleteTournament = async (id: string) => {
  try {
    await useTournament().destroy(id);
    await loadTournaments();
  } catch (error) {
    console.error(error);
  }
};

const loadTournaments = async () => {
  try {
    const response = await useTournament().index();
    if (response) {
      tournaments.value = response.data;
    }
    console.log(tournaments.value);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "EEEE d MMMM HH'h'", { locale: fr });
};

definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-12">
      <h1 class="text-2xl font-bold">Les tournois</h1>
      <CreateTournamentForm @load-tournaments="onloadTournaments" />
    </div>
    <div v-if="isLoading">
      <p>Chargement des tournois...</p>
    </div>
    <div v-else>
      <div v-if="tournaments && tournaments.length > 0">
        <UCard
          class="mb-8"
          v-for="tournament in tournaments"
          :key="tournament.id"
        >
          <div>
            <div class="mb-2">
              <h2 class="text-lg font-bold">
                {{ tournament.name }}
              </h2>
              <p>
                {{ formatDate(tournament.startDate) }} -
                {{ formatDate(tournament.endDate) }}
              </p>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p>Lieu : {{ tournament.location }}</p>
                <p>Prix : {{ tournament.price }} €</p>
                <p>Nombres d'équipes max : {{ tournament.maxTeams }}</p>
              </div>
              <div>
                <p>
                  Status : {{ useTournament().formatStatus(tournament.status) }}
                </p>
                <p>
                  Difficulté :
                  {{ useTournament().formatDifficulty(tournament.difficulty) }}
                </p>
                <p>
                  Catégorie :
                  {{ useTournament().formatCategory(tournament.category) }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <UButton
                  color="black"
                  size="lg"
                  @click="navigateTo(`/admin/tournaments/${tournament.id}`)"
                >
                  <UIcon name="i-heroicons-eye" />
                </UButton>
                <UpdateTournamentForm
                  :id="tournament.id"
                  @load-tournaments="onloadTournaments"
                />
                <UButton
                  color="red"
                  size="lg"
                  @click="onDeleteTournament(tournament.id)"
                >
                  <UIcon name="i-heroicons-trash" />
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </div>
      <div v-else>
        <p>Aucun tournoi trouvé</p>
      </div>
    </div>
  </div>
</template>
