import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(30, "El título no puede superar los 30 caracteres"),

  content: z
    .string()
    .min(20, "El contenido debe tener al menos 20 caracteres"),

  imageUrl: z
    .string()
    .url("La URL de imagen no es válida")
    .or(z.literal("")),
});

export type CreateArticleForm = z.infer<typeof createArticleSchema>;