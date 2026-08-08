import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(150, "El título no puede superar los 150 caracteres"),

  content: z
    .string()
    .min(10, "El contenido debe tener al menos 10 caracteres"),

  imageUrl: z
    .union([
      z.string().url("Debe ser una URL válida"),
      z.literal(""),
    ])
    .optional(),
});

export type CreateArticleForm = z.infer<typeof createArticleSchema>;

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
 imageUrl: z
    .union([
      z.string().url("Debe ser una URL válida"),
      z.literal(""),
    ])
    .optional(),
});