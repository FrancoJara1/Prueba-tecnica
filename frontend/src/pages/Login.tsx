import { Button, Input } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";

export default function Login() {
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      const result = loginSchema.safeParse(value);

      if (!result.success) {
        console.log(result.error.flatten());
        return;
      }

      loginMutation.mutate(result.data);
    },
  });

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >

        <form.Field
          name="email"
          children={(field) => (
            <Input
              placeholder="correo@email.com"
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
              type="password"
              placeholder="Contraseña"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value)
              }
            />
          )}
        />


        <Button
  type="submit"
>
  {loginMutation.isPending ? "Ingresando..." : "Entrar"}
</Button>

      </form>


      {loginMutation.isError && (
        <p>
          Error al iniciar sesión
        </p>
      )}

      {loginMutation.isSuccess && (
        <p>
          Login correcto
        </p>
      )}

    </div>
  );
}