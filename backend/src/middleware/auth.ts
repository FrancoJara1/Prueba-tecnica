import { createMiddleware } from "hono/factory";
import { auth } from "../config/auth";

export const requireAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  });

  if (!session) {
    return c.json({ error: "No autorizado" }, 401);
  }

  // Guardás el usuario en el contexto de Hono para usarlo en tus endpoints
  c.set("user", session.user);
  await next();
});