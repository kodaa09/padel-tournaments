<script setup lang="ts">
import ErrorRegisterModal from "~/components/ErrorRegisterModal.vue";

const tournaments = ref<Tournament[] | null>(null);
const modal = useModal();

onMounted(async () => {
  const response = await useTournament().index();
  if (response) {
    tournaments.value = response.data;
  }
});

const registerError = () => {
  modal.open(ErrorRegisterModal);
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
              {{ useTournament().formatDate(tournament.startDate) }} -
              {{ useTournament().formatDate(tournament.endDate) }}
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
            <div>
              <RegisterTournament
                :tournament-id="tournament.id"
                @register-error="registerError"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
