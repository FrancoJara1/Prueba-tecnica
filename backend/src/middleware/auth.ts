import { createMiddleware } from "hono/factory";
import { auth } from "../config/auth";
import type { User, Session } from "better-auth";

export type AuthEnv = {
  Variables: {
    user: User;
    session: Session;
  };
};

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "No autorizado" }, 401);
    }

    c.set("user", session.user);
    c.set("session", session.session);

    await next();
  } catch (error) {
    console.error("Error en middleware de auth:", error);
    return c.json({ error: "Error al verificar la sesión" }, 401);
  }
});