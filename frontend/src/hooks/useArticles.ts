import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/article.service";

export function useArticles(
  page = 1,
  limit = 10
) {
  return useQuery({
    queryKey: ["articles", page, limit],
    queryFn: () => getArticles(page, limit),
  });
}