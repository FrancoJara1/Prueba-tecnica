import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Button } from "@heroui/react";
import Header from "../components/Header";
import { useArticle } from "../hooks/useArticle";

function calcularTiempoLectura(content: string): number {
  const palabras = content.trim().split(/\s+/).length;
  const minutos = Math.ceil(palabras / 200);
  return minutos < 1 ? 1 : minutos;
}

export default function Article() {
  const { id } = useParams({ from: "/articles/$id" });

  const { data: article, isLoading, isError } = useArticle(id);
  const [copiado, setCopiado] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/articles/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          url,
        });
      } catch {
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      } catch (err) {
        console.error("No se pudo copiar el link", err);
      }
    }
  };

  return (
    <div className="article-page">
      <Header />

      <div className="article-page-content">
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

            <div className="article-detail-header">
              <h1 className="article-detail-title">{article.title}</h1>

              <Button
                className="article-share-button"
                 onPress={handleShare}
                    >
                    {copiado ? (
                    <>
                <CheckIcon />
                     Copiado
                     </>
                         ) : (
                     <>
                 <ShareIcon />
                  Compartir
                     </>
                        )}
            </Button>
            </div>

            <div className="article-detail-meta">
              <span className="article-detail-date">
                Publicado el{" "}
                {new Date(article.createdAt).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              {article.updatedAt &&
                article.updatedAt !== article.createdAt && (
                  <span className="article-detail-updated">
                    · Editado el{" "}
                    {new Date(article.updatedAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}

              <span className="article-detail-reading-time">
                · {calcularTiempoLectura(article.content)} min de lectura
              </span>
              <span className="article-detail-author">
                    · Por {article.author?.name}
              </span>
            </div>

            <div className="article-detail-content">{article.content}</div>
          </article>
        )}
        
      </div>
         <footer className="home-footer">
        Article Manager · Prueba técnica Fullstack
      </footer>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}