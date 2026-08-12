import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/article.service";

export function useArticles(
  page = 1,
  limit = 10,
  order: "asc" | "desc" = "desc",
  sortBy = "createdAt"
) {
  return useQuery({
    queryKey: ["articles", page, limit, order, sortBy],
    queryFn: () => getArticles(page, limit, order, sortBy),
  });
}