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
    <Card>
      <div>
        <h2>{article.title}</h2>

        <p>{article.content}</p>

        <small>
          {new Date(article.createdAt).toLocaleDateString()}
        </small>

        <div>
          <Button
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