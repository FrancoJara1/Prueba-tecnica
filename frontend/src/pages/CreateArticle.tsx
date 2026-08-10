import { Button, TextField, Label, Input, TextArea, FieldError } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { createArticleSchema } from "../schemas/article.schema";
import { useCreateArticle } from "../hooks/useCreateArticle";
import { useNavigate } from "@tanstack/react-router";
import Header from "../components/Header";

function getFieldErrorMessage(errors: unknown[]): string | undefined {
  const first = errors[0];
  if (!first) return undefined;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return (first as { message?: string }).message;
  }
  return String(first);
}

export default function CreateArticle() {
  const createMutation = useCreateArticle();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },

    validators: {
      onChange: createArticleSchema,
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
    <div className="create-article-page">
      <Header />

      <main className="create-article-content">
        <div className="create-article-card">
          <h1>Crear artículo</h1>

          <p className="auth-description">
            Compartí un nuevo artículo con la comunidad.
          </p>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="title">
              {(field) => (
                <TextField
                  isInvalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <Label>Título</Label>
                  <Input
                    placeholder="Título del artículo"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError>
                    {getFieldErrorMessage(field.state.meta.errors)}
                  </FieldError>
                </TextField>
              )}
            </form.Field>

            <form.Field name="content">
              {(field) => (
                <TextField
                  isInvalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <Label>Contenido</Label>
                  <TextArea
                    placeholder="Escribí el contenido del artículo"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    rows={8}
                  />
                  <FieldError>
                    {getFieldErrorMessage(field.state.meta.errors)}
                  </FieldError>
                </TextField>
              )}
            </form.Field>

            <form.Field name="imageUrl">
              {(field) => (
                <TextField
                  isInvalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                >
                  <Label>URL de imagen (opcional)</Label>
                  <Input
                    placeholder="https://..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError>
                    {getFieldErrorMessage(field.state.meta.errors)}
                  </FieldError>
                </TextField>
              )}
            </form.Field>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creando..." : "Crear artículo"}
            </Button>
          </form>

          {createMutation.isError && (
            <p className="error">Error al crear el artículo.</p>
          )}

          {createMutation.isSuccess && (
            <p className="success">Artículo creado correctamente.</p>
          )}
        </div>
      </main>
    </div>
  );
}