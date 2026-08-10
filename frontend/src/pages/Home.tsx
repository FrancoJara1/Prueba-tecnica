import { Input, Button } from "@heroui/react";
import { useState } from "react";

import { useAuthors } from "../hooks/useAuthors";
import { usePublicArticles } from "../hooks/usePublicArticles";
import Header from "../components/Header";
import { useNavigate } from "@tanstack/react-router";

const MAX_AUTHORS = 8;
const MAX_ARTICLES = 9;

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
    data: authors,
    isLoading: authorsLoading,
  } = useAuthors();

  const {
    data: articles,
    isLoading: articlesLoading,
    isError: articlesError,
  } = usePublicArticles(search);

  const visibleAuthors = authors?.slice(0, MAX_AUTHORS) ?? [];
  const visibleArticles = articles?.slice(0, MAX_ARTICLES) ?? [];

  return (
    <div className="home">
      <Header />

      <section className="hero">
        <div className="home-container hero-content">
          <h2>Explorá nuestros artículos</h2>

          <p>
            Buscá artículos por título, contenido o autor.
            Encontrá contenido interesante creado por nuestra
            comunidad.
          </p>

          <div className="search-container">
            <Input
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              onClick={() =>
                setSearch(search.trim())
              }
            >
              Buscar
            </Button>
          </div>
        </div>
      </section>

      <main className="home-container">
        <section className="section">
          <div className="section-title">
            <h2>
              {search
                ? `Resultados para "${search}"`
                : "Últimos artículos"}
            </h2>

            <p>
              {search
                ? "Artículos encontrados."
                : "Descubrí los últimos artículos publicados."}
            </p>
          </div>

          {articlesLoading && (
            <p>Cargando artículos...</p>
          )}

          {articlesError && (
            <p className="error">
              Error al cargar los artículos.
            </p>
          )}

          {!articlesLoading &&
            !articlesError &&
            articles?.length === 0 && (
              <div className="empty-state">
                <h3>No encontramos artículos</h3>

                <p>
                  Probá con otro término de búsqueda.
                </p>
              </div>
            )}

          <div className="articles-grid">
            {visibleArticles.map((article: any) => (
              <article
                className="article-card"
                key={article._id}
                role="button"
                tabIndex={0}
                onClick={() => navigate({ to: `/articles/${article._id}` })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate({ to: `/articles/${article._id}` });
                  }
                }}
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                  />
                )}

                <div className="article-content">
                  <h3>{article.title}</h3>

                  <p className="article-author">
                    Por {article.author?.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
         <section className="section">
          <div className="section-title">
            <h2>Autores destacados</h2>
            <p>
              Conocé a los autores de nuestra comunidad.
            </p>
          </div>

          {authorsLoading && (
            <p>Cargando autores...</p>
          )}

          <div className="authors-grid">
            {visibleAuthors.map((author: any) => (
              <div
                className="author-card"
                key={author._id}
              >
                <h3>{author.name}</h3>

                <p>
                  {author.articles}{" "}
                  {author.articles === 1
                    ? "artículo"
                    : "artículos"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        Article Manager · Prueba técnica Fullstack
      </footer>
    </div>
  );
}