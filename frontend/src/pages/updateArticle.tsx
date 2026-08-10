import {Button,TextField,Label,Input,TextArea,FieldError,} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useArticle } from "../hooks/useArticle";
import { useUpdateArticle } from "../hooks/useUpdateArticle";
import { createArticleSchema } from "../schemas/article.schema";
import Header from "../components/Header";

function getFieldErrorMessage(errors: unknown[]): string | undefined {
  const first = errors[0];

  if (!first) return undefined;

  if (typeof first === "string") {
    return first;
  }

  if (
    typeof first === "object" &&
    first !== null &&
    "message" in first
  ) {
    return (first as { message?: string }).message;
  }

  return String(first);
}

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

  useEffect(() => {
    if (data) {
      form.setFieldValue("title", data.title);
      form.setFieldValue("content", data.content);
      form.setFieldValue("imageUrl", data.imageUrl ?? "");
    }
  }, [data, form]);

  if (isLoading) {
    return <p>Cargando artículo...</p>;
  }

  if (isError || !data) {
    return <p>No se pudo cargar el artículo.</p>;
  }

  return (
    <div>
      <Header />

      <main className="create-article-content">
        <div className="create-article-card">

          <h1>Editar artículo</h1>

          <p className="auth-description">
            Editá lo que te parezca necesario.
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
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                  />

                  <FieldError>
                    {getFieldErrorMessage(
                      field.state.meta.errors
                    )}
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
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                    rows={8}
                  />

                  <FieldError>
                    {getFieldErrorMessage(
                      field.state.meta.errors
                    )}
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
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    onBlur={field.handleBlur}
                  />

                  <FieldError>
                    {getFieldErrorMessage(
                      field.state.meta.errors
                    )}
                  </FieldError>
                </TextField>
              )}
            </form.Field>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={updateMutation.isPending}
            >
              {updateMutation.isPending
                ? "Guardando..."
                : "Guardar cambios"}
            </Button>

          </form>

          {updateMutation.isError && (
            <p className="error">
              Error al actualizar el artículo.
            </p>
          )}

          {updateMutation.isSuccess && (
            <p className="success">
              Artículo actualizado correctamente.
            </p>
          )}

        </div>
      </main>
    </div>
  );
}