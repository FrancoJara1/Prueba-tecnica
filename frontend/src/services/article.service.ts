import { api } from "./api";

export async function getArticles(
  page = 1,
  limit = 10
) {
  const response = await api.get("/articles", {
    params: {
      page,
      limit,
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

export async function deleteArticle(id: string) {
  const response = await api.delete(`/articles/${id}`);

  return response.data;
}