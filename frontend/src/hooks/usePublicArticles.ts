import { useQuery } from "@tanstack/react-query";
import { searchPublicArticles } from "../services/public.service";

export function usePublicArticles(search: string) {
  return useQuery({
    queryKey: ["public-articles", search],
    queryFn: () => searchPublicArticles(search),
  });
}