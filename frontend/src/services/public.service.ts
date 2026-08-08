import { api } from "./api";

export async function getAuthors() {
  const response = await api.get("/public/authors");

  return response.data;
}

export async function searchPublicArticles(search = "") {
  const response = await api.get("/public/articles", {
    params: {
      search,
    },
  });

  return response.data;
}