import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
});

export type SignupSchema = z.output<typeof signupSchema>;
export type LoginSchema = z.output<typeof loginSchema>;
