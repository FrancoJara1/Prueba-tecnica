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

  return (
    <Card className="article-item-card">
      
      <div className="article-item-body">
        <h2 className="article-item-title">{article.title}</h2>

        <p className="article-item-content">{article.content}</p>

        <small className="article-item-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </small>

        {confirmingDelete ? (
          <div className="article-item-confirm">
            <span className="article-item-confirm-text">
              ¿Eliminar este artículo?
            </span>

            <div className="article-item-confirm-actions">
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
          <div className="article-item-actions">
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