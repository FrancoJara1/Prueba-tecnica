import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Button } from "@heroui/react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/updateArticle";
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
 component: () => (
  <div>
    <h1>Home</h1>

    <Button>
      Probar HeroUI
    </Button>
  </div>
),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => <h1>Register</h1>,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
 component: () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
),
});
const createArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/new",
  component: CreateArticle,
});
const editArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/$id/edit",
  component: EditArticle,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  createArticleRoute,
  editArticleRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}