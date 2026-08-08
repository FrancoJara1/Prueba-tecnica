import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "../services/article.service";

export function useArticle(id: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
}