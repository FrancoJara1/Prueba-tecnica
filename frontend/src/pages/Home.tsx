import { Input, Button } from "@heroui/react";
import { useState } from "react";

import { useAuthors } from "../hooks/useAuthors";
import { usePublicArticles } from "../hooks/usePublicArticles";
import { useNavigate } from "@tanstack/react-router";
import { useCurrentUser,useLogout } from "../hooks/useAuth";
export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
  data: user,
  isLoading: sessionLoading,
} = useCurrentUser();

const logoutMutation = useLogout();
  const {
    data: authors,
    isLoading: authorsLoading,
  } = useAuthors();

  const {
    data: articles,
    isLoading: articlesLoading,
    isError: articlesError,
  } = usePublicArticles(search);
  
  return (
    <div className="home">
<header className="home-header">
  <div className="home-container header-content">
    <div>
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
            onClick={() => logoutMutation.mutate()}
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
            <h2>Autores</h2>
            <p>
              Conocé a los autores de nuestra comunidad.
            </p>
          </div>

          {authorsLoading && (
            <p>Cargando autores...</p>
          )}

          <div className="authors-grid">
            {authors?.map((author: any) => (
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
            {articles?.map((article: any) => (
              <article
                className="article-card"
                key={article._id}
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

                  <p className="article-description">
                    {article.content}
                  </p>

                  <small>
                    {new Date(
                      article.createdAt
                    ).toLocaleDateString()}
                  </small>
                </div>
              </article>
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