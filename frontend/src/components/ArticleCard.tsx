import { Card } from "@heroui/react";

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
  return (
    <Card>
      <div>
        <h2>{article.title}</h2>

        <p>{article.content}</p>

        <small>
          {new Date(article.createdAt).toLocaleDateString()}
        </small>
      </div>
    </Card>
  );
}