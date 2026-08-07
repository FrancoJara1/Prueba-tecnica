import { api } from "./api";

export async function getArticles() {
  const response = await api.get("/articles");

  return response.data;
}