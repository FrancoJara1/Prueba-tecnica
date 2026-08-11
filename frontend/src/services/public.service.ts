import { api } from "./api";

export async function getAuthors() {
  const response = await api.get("/public/authors");

  return response.data;
}

export async function searchPublicArticles(
  search = "",
  page = 1,
  limit = 9
) {
  const response = await api.get("/public/articles", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data;
}