import { useNavigate, useParams } from "@tanstack/react-router";

import Header from "../components/Header";
import { useArticle } from "../hooks/useArticle";

export default function Article() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/articles/$id" });

  const { data: article, isLoading, isError } = useArticle(id);

  return (
    <div className="article-page">
      <Header />

      <div className="article-page-content">
        <button
          type="button"
          className="article-back-button"
          onClick={() => navigate({ to: "/" })}
        >
          ← Volver
        </button>

        {isLoading && (
          <div className="article-state">
            <div className="dashboard-spinner" aria-hidden="true" />
            <p>Cargando artículo...</p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="article-state article-state--error">
            <h3>No pudimos cargar este artículo</h3>
            <p>Puede que haya sido eliminado o no exista.</p>
          </div>
        )}

        {!isLoading && !isError && article && (
          <article className="article-detail">
            {article.imageUrl && (
              <img
                className="article-detail-image"
                src={article.imageUrl}
                alt={article.title}
              />
            )}

            <h1 className="article-detail-title">{article.title}</h1>

            <div className="article-detail-meta">
              {article.author?.name && (
                <span className="article-detail-author">
                  Por {article.author.name}
                </span>
              )}

              <span className="article-detail-date">
                {new Date(article.createdAt).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="article-detail-content">
              {article.content}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}