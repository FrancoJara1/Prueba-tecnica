import { getToken } from "../services/storage";

export function useAuthUser() {
  const token = getToken();

  return {
    isAuthenticated: !!token,
  };
}