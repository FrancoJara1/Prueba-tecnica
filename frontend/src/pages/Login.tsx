import { Button, Input} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export default function Login() {
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      const result = loginSchema.safeParse(value);

      if (!result.success) {
        return;
      }

      loginMutation.mutate(result.data, {
        onSuccess: () => {
          navigate({
            to: "/",
          });
        },
      });
    },
  });

return (
  <div className="auth-page">
    <div className="auth-card">
      <h1>Iniciar sesión</h1>

      <p className="auth-description">
        Ingresá a tu cuenta para continuar.
      </p>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <Input
              autoFocus
              placeholder="correo@email.com"
              type="email"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
            />
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <Input
              placeholder="Contraseña"
              type="password"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
            />
          )}
        />

        {loginMutation.isError && (
          <p className="error">
            Email o contraseña incorrectos.
          </p>
        )}

        <Button
          type="submit"
          className="auth-submit"
          isDisabled={loginMutation.isPending}
        >
          {loginMutation.isPending
            ? "Ingresando..."
            : "Entrar"}
        </Button>
      </form>

      <div className="auth-register">
        <p>¿No tenés una cuenta?</p>

        <Button
          type="button"
          onClick={() =>
            navigate({
              to: "/register",
            })
          }
        >
          Registrate
        </Button>
      </div>
    </div>
  </div>
);
}