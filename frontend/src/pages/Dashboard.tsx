import { Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import ArticleCard from "../components/ArticleCard";
import { useArticles } from "../hooks/useArticles";
import { useCurrentUser, useLogout } from "../hooks/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const limit = 3;

  const {
    data: user,
    isLoading: sessionLoading,
  } = useCurrentUser();

  const logoutMutation = useLogout();

  const {
    data,
    isLoading,
    isError,
  } = useArticles(page, limit);

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasArticles = articles.length > 0;

  return (
    <div className="dashboard-page">
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
                <span className="user-name">
                  Hola, {user.name}
                </span>

                 <Button
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
                onClick={() => navigate({ to: "/login" })}
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-toolbar">
          <h1>Mis artículos</h1>
          <span className="dashboard-count">
           {hasArticles
              ? `${data?.total} artículo${
                  (data?.total) === 1 ? "" : "s"
                } en total`
              : null}
          </span>

          <Button
            className="dashboard-cta"
            onClick={() =>
              navigate({
                to: "/articles/new",
              })
            }
          >
            + Crear artículo
          </Button>
        </div>

        {isLoading && (
          <div className="dashboard-state">
            <div className="dashboard-spinner" aria-hidden="true" />
            <p>Cargando tus artículos...</p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="dashboard-state dashboard-state--error">
            <h3>No pudimos cargar tus artículos</h3>
            <p>Revisá tu conexión e intentá de nuevo.</p>
          </div>
        )}

        {!isLoading && !isError && !hasArticles && (
          <div className="dashboard-empty">
            <h3>Todavía no publicaste nada</h3>
            <p>Creá tu primer artículo para que aparezca acá.</p>

            <Button
              className="dashboard-cta"
              onClick={() =>
                navigate({
                  to: "/articles/new",
                })
              }
            >
              Crear mi primer artículo
            </Button>
          </div>
        )}

        {!isLoading && !isError && hasArticles && (
          <>
            <div className="dashboard-grid">
              {articles.map((article: any) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="dashboard-pagination"
                aria-label="Paginación de artículos"
              >
                <button
                  type="button"
                  className="pagination-button"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  ← Anterior
                </button>

                <span className="pagination-info">
                  Página {page} de {totalPages}
                </span>

                <button
                  type="button"
                  className="pagination-button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Siguiente →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}