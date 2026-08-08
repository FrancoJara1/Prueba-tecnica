import { Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import ArticleCard from "../components/ArticleCard";
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

  if (isLoading) {
    return <p>Cargando artículos...</p>;
  }

  if (isError) {
    return <p>Error cargando artículos</p>;
  }

  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      <h1>Mis artículos</h1>

      <Button
        onClick={() =>
          navigate({
            to: "/articles/new",
          })
        }
      >
        Crear artículo
      </Button>

      <div>
        {data?.data?.map((article: any) => (
          <ArticleCard
            key={article._id}
            article={article}
          />
        ))}
      </div>

      <div>
        <Button
          isDisabled={page === 1}
          onClick={() => setPage((current) => current - 1)}
        >
          Anterior
        </Button>

        <span>
          Página {page} de {totalPages}
        </span>

        <Button
          isDisabled={page >= totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}