import { useQuery } from "@tanstack/react-query";
import { searchPublicArticles } from "../services/public.service";

export function usePublicArticles(
  search: string,
  page: number = 1
) {
  return useQuery({
    queryKey: ["public-articles", search, page],

    queryFn: () => searchPublicArticles(search, page, 9),

    placeholderData: (previousData) => previousData,
  });
}