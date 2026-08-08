import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";

import { api } from "../services/api";
import { registerSchema } from "../schemas/register.schema";

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
            <label>
              Nombre

              <input
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Tu nombre"
              />

              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <span className="field-error">
                  {field.state.meta.errors[0]?.message}
                </span>
              )}
            </label>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <label>
              Email

              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="tu@email.com"
              />

              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <span className="field-error">
                  {field.state.meta.errors[0]?.message}
                </span>
              )}
            </label>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <label>
              Contraseña

              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Mínimo 8 caracteres"
              />

              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <span className="field-error">
                  {field.state.meta.errors[0]?.message}
                </span>
              )}
            </label>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <label>
              Confirmar contraseña

              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Repetí tu contraseña"
              />

              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <span className="field-error">
                  {field.state.meta.errors[0]?.message}
                </span>
              )}
            </label>
          )}
        </form.Field>

        <button type="submit">
          Crear cuenta
        </button>
      </form>

      <div className="auth-footer">
        <span>¿Ya tenés una cuenta?</span>

        <button
          type="button"
          className="link-button"
          onClick={() => navigate({ to: "/login" })}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  </div>
);
}