import { z } from "zod";
import { projectTypes } from "@/data/services";

export const budgetOptions = [
  "Je ne sais pas encore",
  "Moins de 500 €",
  "500 € à 2 000 €",
  "2 000 € à 5 000 €",
  "Plus de 5 000 €",
] as const;

/** Schéma partagé entre le formulaire (client) et la route d'API (serveur). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indique ton nom (2 caractères minimum).")
    .max(100, "Le nom est trop long (100 caractères maximum)."),
  email: z
    .string()
    .trim()
    .max(200, "L'adresse e-mail est trop longue.")
    .pipe(z.email("Saisis une adresse e-mail valide, par exemple nom@exemple.com.")),
  projectType: z.enum(projectTypes, {
    error: "Choisis un type de projet dans la liste.",
  }),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Décris ton projet en au moins 20 caractères.")
    .max(4000, "Le message est trop long (4 000 caractères maximum)."),
  /** Champ piège : un humain ne le remplit jamais. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Horodatage d'ouverture du formulaire, pour détecter les envois instantanés. */
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
