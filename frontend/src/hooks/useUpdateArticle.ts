import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "../services/article.service";

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        content: string;
        imageUrl?: string;
      };
    }) => updateArticle(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["article", variables.id],
      });
    },
  });
}