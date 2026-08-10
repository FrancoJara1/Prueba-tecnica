import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteArticle } from "../hooks/useDeleteArticle";

interface Article {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export default function ArticleCard({
  article,
}: {
  article: Article;
}) {
  const navigate = useNavigate();
  const deleteMutation = useDeleteArticle();

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const goToArticle = () => {
    navigate({ to: `/articles/${article._id}` });
  };

  return (
    <Card
      className="article-item-card"
      role="button"
      tabIndex={0}
      onClick={goToArticle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          goToArticle();
        }
      }}
    >
      {article.imageUrl && (
        <div className="article-card-image">
          <img src={article.imageUrl} alt={article.title} />
        </div>
      )}

      <div className="article-item-body">
        <h2 className="article-item-title">{article.title}</h2>

        <small className="article-item-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </small>

        {confirmingDelete ? (
          <div className="article-item-confirm">
            <span className="article-item-confirm-text">
              ¿Eliminar este artículo?
            </span>

            <div
              className="article-item-confirm-actions"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className="btn-cancel"
                onPress={() => setConfirmingDelete(false)}
                isDisabled={deleteMutation.isPending}
              >
                No
              </Button>

              <Button
                size="sm"
                className="btn-confirm-delete"
                onPress={() => {
                  deleteMutation.mutate(article._id);
                }}
                isDisabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Eliminando..." : "Sí, eliminar"}
              </Button>
            </div>
            {deleteMutation.isError && (
              <p className="error">
                No se pudo eliminar el artículo. Intentá nuevamente.
              </p>
            )}
          </div>
        ) : (
          <div
            className="article-item-actions"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="article-item-edit"
              size="sm"
              onPress={() =>
                navigate({
                  to: "/articles/$id/edit",
                  params: {
                    id: article._id,
                  },
                })
              }
            >
              Editar
            </Button>

            <Button
              className="article-item-delete"
              size="sm"
              onPress={() => setConfirmingDelete(true)}
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}