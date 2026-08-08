import { Input, Button } from "@heroui/react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { useArticle } from "../hooks/useArticle";
import { useUpdateArticle } from "../hooks/useUpdateArticle";
import { createArticleSchema } from "../schemas/article.schema";

export default function EditArticle() {
  const { id } = useParams({
    from: "/articles/$id/edit",
  });

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useArticle(id);

  const updateMutation = useUpdateArticle();

  const form = useForm({
    defaultValues: {
      title: data?.title ?? "",
      content: data?.content ?? "",
      imageUrl: data?.imageUrl ?? "",
    },

    onSubmit: async ({ value }) => {
      const validation = createArticleSchema.safeParse(value);

      if (!validation.success) {
        console.log(validation.error.flatten());
        return;
      }

      updateMutation.mutate(
        {
          id,
          data: validation.data,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/dashboard",
            });
          },
        }
      );
    },
  });

  if (isLoading) {
    return <p>Cargando artículo...</p>;
  }

  if (isError || !data) {
    return <p>No se pudo cargar el artículo.</p>;
  }

  return (
    <div>
      <h1>Editar artículo</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => (
            <Input
              placeholder="Título"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
            />
          )}
        />

        <form.Field
          name="content"
          children={(field) => (
            <textarea
              placeholder="Contenido"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
              rows={8}
            />
          )}
        />

        <form.Field
          name="imageUrl"
          children={(field) => (
            <Input
              placeholder="URL de imagen (opcional)"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
            />
          )}
        />

        <Button type="submit">
          {updateMutation.isPending
            ? "Guardando..."
            : "Guardar cambios"}
        </Button>
      </form>

      {updateMutation.isError && (
        <p>Error al actualizar el artículo.</p>
      )}
    </div>
  );
}