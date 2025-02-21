import type {
  CreateTournamentSchema,
  UpdateTournamentSchema,
} from "~/schemas/tournament.schema.js";

export function useTournament() {
  const config = useRuntimeConfig();

  const statusOptions = [
    {
      name: "À venir",
      value: "upcoming",
    },
    {
      name: "En cours",
      value: "ongoing",
    },
    {
      name: "Terminé",
      value: "completed",
    },
  ];
  const difficultyOptions = [
    {
      name: "P25",
      value: "P25",
    },
    {
      name: "P100",
      value: "P100",
    },
    {
      name: "P250",
      value: "P250",
    },
    {
      name: "P500",
      value: "P500",
    },
    {
      name: "P1000",
      value: "P1000",
    },
    {
      name: "P2000",
      value: "P2000",
    },
    {
      name: "Aucune",
      value: "any",
    },
  ];
  const categoryOptions = [
    {
      name: "Hommes",
      value: "men",
    },
    {
      name: "Femmes",
      value: "women",
    },
    {
      name: "Mixte",
      value: "mixte",
    },
  ];

  async function index() {
    const tournaments = await $fetch<TournamentsResponse>(
      `${config.public.apiBase}/tournaments`,
      {
        credentials: "include",
      }
    );

    if (tournaments) return tournaments;
  }

  async function store(body: CreateTournamentSchema) {
    const tournament = await $fetch(`${config.public.apiBase}/tournaments`, {
      method: "POST",
      body,
      credentials: "include",
    });

    if (tournament) return tournament;
  }

  async function show(id: string) {
    const tournament = await $fetch<TournamentResponse>(
      `${config.public.apiBase}/tournaments/${id}`,
      {
        credentials: "include",
      }
    );
    return tournament;
  }

  async function update(id: string, body: UpdateTournamentSchema) {
    const tournament = await $fetch(
      `${config.public.apiBase}/tournaments/${id}`,
      {
        method: "PUT",
        body,
        credentials: "include",
      }
    );

    if (tournament) return tournament;
  }

  async function destroy(id: string) {
    const tournament = await $fetch(
      `${config.public.apiBase}/tournaments/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (tournament) return tournament;
  }

  function formatStatus(status: string) {
    const statusMap = {
      upcoming: "À venir",
      ongoing: "En cours",
      completed: "Terminé",
    };
    return statusMap[status as keyof typeof statusMap] || status;
  }

  function formatCategory(category: string) {
    const categoryMap = {
      men: "Homme",
      women: "Femme",
      mixte: "Mixte",
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  }

  function formatDifficulty(difficulty: string) {
    const difficultyMap = {
      P25: "P25",
      P100: "P100",
      P250: "P250",
      P500: "P500",
      P1000: "P1000",
      P2000: "P2000",
      any: "Aucune",
    };
    return (
      difficultyMap[difficulty as keyof typeof difficultyMap] || difficulty
    );
  }

  return {
    statusOptions,
    difficultyOptions,
    categoryOptions,
    index,
    store,
    show,
    update,
    destroy,
    formatStatus,
    formatCategory,
    formatDifficulty,
  };
}

export type TournamentsResponse = {
  message: string;
  data: Tournament[];
  status: string;
};

export type TournamentResponse = {
  message: string;
  data: Tournament;
  status: string;
};

export type Tournament = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  difficulty: string;
  category: string;
};
