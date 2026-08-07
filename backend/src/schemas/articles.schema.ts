import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),

  content: z
    .string()
    .min(20, "El contenido debe tener al menos 20 caracteres"),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100)
    .optional(),

  content: z
    .string()
    .min(20, "El contenido debe tener al menos 20 caracteres")
    .optional(),
});