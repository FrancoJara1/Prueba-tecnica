import { Button, Input} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { createArticleSchema } from "../schemas/article.schema";
import { useCreateArticle } from "../hooks/useCreateArticle";
import { useNavigate } from "@tanstack/react-router";
export default function CreateArticle() {
  const createMutation = useCreateArticle();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },

    onSubmit: async ({ value }) => {
      const validation = createArticleSchema.safeParse(value);

      if (!validation.success) {
        console.log(validation.error.flatten());
        return;
      }

       createMutation.mutate(validation.data, {
    onSuccess: () => {
      navigate({
        to: "/dashboard",
      });
    },
  });
    },
  });

  return (
    <div>
      <h1>Crear artículo</h1>

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
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />

        <form.Field
          name="content"
          children={(field) => (
            <textarea
              placeholder="Contenido"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />

        <form.Field
          name="imageUrl"
          children={(field) => (
            <Input
              placeholder="URL de imagen (opcional)"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />

        <Button type="submit">
          {createMutation.isPending
            ? "Creando..."
            : "Crear artículo"}
        </Button>
      </form>

      {createMutation.isError && (
        <p>Error al crear el artículo.</p>
      )}

      {createMutation.isSuccess && (
        <p>Artículo creado correctamente.</p>
      )}
    </div>
  );
}