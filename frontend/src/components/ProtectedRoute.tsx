import { Navigate } from "@tanstack/react-router";
import { useAuthUser } from "../hooks/useAuthUser";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}