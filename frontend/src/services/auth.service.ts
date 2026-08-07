import { api } from "./api";

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post(
    "/api/auth/sign-up/email",
    data
  );

  return response.data;
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await api.post(
    "/api/auth/sign-in/email",
    data
  );

  return response.data;
}