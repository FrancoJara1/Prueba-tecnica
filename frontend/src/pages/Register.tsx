import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Button, TextField, Label, Input, FieldError } from "@heroui/react";
import { api } from "../services/api";
import { registerSchema } from "../schemas/register.schema";

function getFieldErrorMessage(errors: unknown[]): string | undefined {
  const first = errors[0];
  if (!first) return undefined;
  if (typeof first === "string") return first;
  if (typeof first === "object" && first !== null && "message" in first) {
    return (first as { message?: string }).message;
  }
  return String(first);
}

export default function Register() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validators: {
      onChange: registerSchema,
    },

    onSubmit: async ({ value }) => {
      const result = registerSchema.safeParse(value);

      if (!result.success) {
        return;
      }

      try {
        await api.post("/api/auth/sign-up/email", {
          name: result.data.name,
          email: result.data.email,
          password: result.data.password,
        });

        navigate({
          to: "/login",
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>

        <p className="auth-description">
          Registrate para comenzar a publicar artículos.
        </p>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <TextField
                isInvalid={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                }
              >
                <Label>Nombre</Label>
                <Input
                  placeholder="Tu nombre"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError>{getFieldErrorMessage(field.state.meta.errors)}</FieldError>
              </TextField>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <TextField
                isInvalid={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                }
              >
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError>{getFieldErrorMessage(field.state.meta.errors)}</FieldError>
              </TextField>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <TextField
                isInvalid={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                }
              >
                <Label>Contraseña</Label>
                <Input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError>{getFieldErrorMessage(field.state.meta.errors)}</FieldError>
              </TextField>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <TextField
                isInvalid={
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                }
              >
                <Label>Confirmar contraseña</Label>
                <Input
                  type="password"
                  placeholder="Repetí tu contraseña"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldError>{getFieldErrorMessage(field.state.meta.errors)}</FieldError>
              </TextField>
            )}
          </form.Field>

          <Button type="submit" variant="primary" fullWidth>
            Crear cuenta
          </Button>
        </form>

        <div className="auth-footer">
          <span>¿Ya tenés una cuenta?</span>

          <Button
            type="button"
            variant="ghost"
            onPress={() => navigate({ to: "/login" })}
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}