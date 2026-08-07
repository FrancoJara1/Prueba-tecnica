import { Hono } from "hono";
import { auth } from "../config/auth";

const app = new Hono();

// Captura todas las rutas bajo /api/auth/* (signup, signin, signout, etc.)
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;