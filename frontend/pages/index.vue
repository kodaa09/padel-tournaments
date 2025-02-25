<script setup lang="ts">
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
const tournaments = ref<Tournament[] | null>(null);

onMounted(async () => {
  const response = await useTournament().index();
  if (response) {
    tournaments.value = response.data;
  }
});

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "EEEE d MMMM HH'h'", { locale: fr });
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Liste des tournois</h1>
    <div v-if="tournaments">
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
              <UButton size="lg"> S'inscrire </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
