import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { saveToken } from "../services/storage";

export function useLogin() {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      saveToken(data.token);
    },
  });
}