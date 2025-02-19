import { z } from "zod";

export const signupSchema = z.object({
  licenseNumber: z
    .number({
      required_error: "Le numéro de licence est obligatoire",
      invalid_type_error: "Le numéro de licence doit être un nombre",
    })
    .int("Le numéro de licence doit être un nombre entier")
    .min(1000000, "Le numéro de licence doit avoir au moins 7 chiffres")
    .max(9999999, "Le numéro de licence doit avoir au maximum 7 chiffres"),
  firstname: z
    .string({ required_error: "Le prénom est obligatoire" })
    .min(1, { message: "Le prénom est obligatoire" }),
  lastname: z
    .string({ required_error: "Le nom de famille est obligatoire" })
    .min(1, { message: "Le nom de famille est obligatoire" }),
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
