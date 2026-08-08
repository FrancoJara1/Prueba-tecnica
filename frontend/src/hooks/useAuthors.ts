import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../services/public.service";

export function useAuthors() {
  return useQuery({
    queryKey: ["public-authors"],
    queryFn: getAuthors,
  });
}