import { z } from "zod";

export const createTournamentSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  price: z.number().min(0),
  maxTeams: z.number().min(1),
  type: z.enum(["bracket", "round-robin"]),
  seed: z.boolean(),
  consolation: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["upcoming", "ongoing", "completed"]),
  difficulty: z.enum(["P25", "P100", "P250", "P500", "P1000", "P2000", "any"]),
  category: z.enum(["men", "women", "mixte"]),
});

export const registerTournamentSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  licenseNumber: z.string().min(1),
});

export const updateTournamentSchema = createTournamentSchema.partial();

export type CreateTournamentSchema = z.infer<typeof createTournamentSchema>;
export type UpdateTournamentSchema = z.infer<typeof updateTournamentSchema>;
export type RegisterTournamentSchema = z.infer<typeof registerTournamentSchema>;
