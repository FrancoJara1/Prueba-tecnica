import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  login,
  getCurrentUser,
  logout,
} from "../services/auth.service";

import { saveToken, removeToken } from "../services/storage";

export function useLogin() {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      saveToken(data.token);
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      removeToken();

      queryClient.setQueryData(["currentUser"], null);
    },
  });
}