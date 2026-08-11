import { Button, Dropdown, Label } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";

import { useCurrentUser, useLogout } from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: sessionLoading,
  } = useCurrentUser();

  const logoutMutation = useLogout();

  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";

  return (
    <header className="home-header">
      <div className="home-container header-content">
        <div
          className="brand-link"
          role="button"
          tabIndex={0}
          onClick={() => navigate({ to: "/" })}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate({ to: "/" });
            }
          }}
        >
          <h1>Article Manager</h1>
          <p>Descubrí artículos y autores</p>
        </div>

        <div className="user-actions">
          {sessionLoading ? (
            <span>Cargando...</span>
          ) : user ? (
            <>
              <span className="user-name" title={user.name}>
                Hola, {firstName}
              </span>

              <Dropdown>
                <Button className="articles-dropdown-trigger">
                  Mis artículos
                </Button>

                <Dropdown.Popover className="articles-dropdown-popover">
                  <Dropdown.Menu
                    className="articles-dropdown-menu"
                    onAction={(key) => {
                      if (key === "view") {
                        navigate({ to: "/dashboard" });
                      } else if (key === "create") {
                        navigate({ to: "/articles/new" });
                      }
                    }}
                  >
                    <Dropdown.Item
                      id="view"
                      textValue="Ver mis artículos"
                      className="articles-dropdown-item"
                    >
                      <Label>Ver mis artículos</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="create"
                      textValue="Crear artículo"
                      className="articles-dropdown-item"
                    >
                      <Label>Crear artículo</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              <Button
                className="articles-dropdown-trigger"
                onClick={() =>
                  logoutMutation.mutate(undefined, {
                    onSuccess: () => navigate({ to: "/" }),
                  })
                }
                isDisabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending
                  ? "Cerrando sesión..."
                  : "Cerrar sesión"}
              </Button>
            </>
          ) : (
            <Button
              className="articles-dropdown-trigger"
              onClick={() => navigate({ to: "/login" })}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}