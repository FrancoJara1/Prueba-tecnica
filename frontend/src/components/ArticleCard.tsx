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
                variant="tertiary"
                size="sm"
                onPress={() => setConfirmingDelete(false)}
                isDisabled={deleteMutation.isPending}
              >
                No
              </Button>

              <Button
                variant="danger"
                size="sm"
                onPress={() => {
                  deleteMutation.mutate(article._id);
                }}
                isDisabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Eliminando..." : "Sí, eliminar"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="article-item-actions">
            <Button
              className="article-item-edit"
              variant="outline"
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
              variant="danger-soft"
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