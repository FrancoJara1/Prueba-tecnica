import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/updateArticle";
import Home from "./pages/Home";
import Register from "./pages/Register";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});


const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
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
  component: () => (
    <ProtectedRoute>
      <CreateArticle />
    </ProtectedRoute>
  ),
});

const editArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/$id/edit",
  component: () => (
    <ProtectedRoute>
      <EditArticle />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
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