import { api } from "./api";

export async function getArticles(
  page = 1,
  limit = 10,
  order: "asc" | "desc" = "desc",
  sortBy = "createdAt"
) {
  const response = await api.get("/articles", {
    params: {
      page,
      limit,
      sortBy,
      order,
    },
  });

  return response.data;
}

export async function getArticleById(id: string) {
  const response = await api.get(`/articles/${id}`);

  return response.data;
}

export async function createArticle(data: {
  title: string;
  content: string;
  imageUrl?: string;
}) {
  const response = await api.post("/articles", data);

  return response.data;
}

export async function updateArticle(
  id: string,
  data: {
    title: string;
    content: string;
    imageUrl?: string;
  }
) {
  const response = await api.put(`/articles/${id}`, data);

  return response.data;
}

export async function addCommentToArticle(
  articleId: string,
  data: { comment: string }
) {
  const response = await api.post(`/articles/${articleId}/comments`, data);

  return response.data;
}

export async function updateComment(
  articleId: string,
  _id: string,
  data: { comment: string }
) {
  const response = await api.put(
    `/articles/${articleId}/comments/${_id}`,
    data
  );

  return response.data;
}

export async function deleteComment(articleId: string, _id: string) {
  const response = await api.delete(
    `/articles/${articleId}/comments/${_id}`
  );

  return response.data;
}

export async function deleteArticle(id: string) {
  const response = await api.delete(`/articles/${id}`);

  return response.data;
}