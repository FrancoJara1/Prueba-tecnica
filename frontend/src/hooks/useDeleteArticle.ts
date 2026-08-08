import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "../services/article.service";

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      queryClient.removeQueries({
        queryKey: ["article", id],
      });
    },
  });
}