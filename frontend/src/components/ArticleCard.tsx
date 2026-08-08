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

  return (
    <Card className="article-item-card">
      <div className="article-item-body">
        <h2 className="article-item-title">{article.title}</h2>

        <p className="article-item-content">{article.content}</p>

        <small className="article-item-date">
          {new Date(article.createdAt).toLocaleDateString()}
        </small>

        <div className="article-item-actions">
          <Button
            className="article-item-edit"
            size="sm"
            onClick={() =>
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
            onClick={() => {
              const confirmed = window.confirm(
                "¿Seguro que querés eliminar este artículo?"
              );

              if (confirmed) {
                deleteMutation.mutate(article._id);
              }
            }}
            isDisabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending
              ? "Eliminando..."
              : "Eliminar"}
          </Button>
        </div>
      </div>
    </Card>
  );
}