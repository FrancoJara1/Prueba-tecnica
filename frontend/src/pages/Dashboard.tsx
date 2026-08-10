import { Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import ArticleCard from "../components/ArticleCard";
import Header from "../components/Header";
import { useArticles } from "../hooks/useArticles";

export default function Dashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const limit = 3;

  const {
    data,
    isLoading,
    isError,
  } = useArticles(page, limit);

  const articles = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasArticles = articles.length > 0;

  useEffect(() => {
    if (data && page > data.totalPages && data.totalPages > 0) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  return (
    <div className="dashboard-page">
      <Header />

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
            onPress={() =>
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

      <footer className="dashboard-footer">
        Article Manager · Prueba técnica Fullstack
      </footer>
    </div>
  );
}