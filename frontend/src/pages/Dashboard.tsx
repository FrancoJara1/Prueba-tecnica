import { Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ArticleCard from "../components/ArticleCard";
import Header from "../components/Header";
import { useArticles } from "../hooks/useArticles";

type Order = "asc" | "desc";

export default function Dashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>("desc");

  const limit = 3;
  const sortBy = "createdAt";

  const {
    data,
    isLoading,
    isError,
  } = useArticles(page, limit, order, sortBy);

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasArticles = articles.length > 0;

  useEffect(() => {
    if (data && page > data.totalPages && data.totalPages > 0) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  const handleOrderChange = (value: Order) => {
    if (value === order) return;
    setOrder(value);
    setPage(1);
  };

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-content">
        <div className="dashboard-toolbar">
          <div className="dashboard-toolbar-heading">
            <h1>Mis artículos</h1>
            <span className="dashboard-count">
              {hasArticles
                ? `${data?.total} artículo${
                    (data?.total) === 1 ? "" : "s"
                  } en total`
                : null}
            </span>
          </div>

          <div className="dashboard-toolbar-actions">
            <div
              className="sort-toggle"
              role="group"
              aria-label="Ordenar por fecha"
            >
              <button
                type="button"
                className={`sort-toggle-option ${
                  order === "desc" ? "is-active" : ""
                }`}
                aria-pressed={order === "desc"}
                onClick={() => handleOrderChange("desc")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 2V12M7 12L3 8M7 12L11 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Recientes
              </button>

              <button
                type="button"
                className={`sort-toggle-option ${
                  order === "asc" ? "is-active" : ""
                }`}
                aria-pressed={order === "asc"}
                onClick={() => handleOrderChange("asc")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 12V2M7 2L3 6M7 2L11 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Antiguos
              </button>
            </div>

            <Button
              className="dashboard-cta"
              onPress={() =>
                navigate({
                  to: "/articles/new",
                })
              }
            >
              + Crear artículo
            </Button>
          </div>
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
              onPress={() =>
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

            {totalPages >= 1 && (
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

      <footer className="dashboard-footer">
        Article Manager · Prueba técnica Fullstack
      </footer>
    </div>
  );
}