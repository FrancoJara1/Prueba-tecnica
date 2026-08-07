import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "./database/mongodb";
import { env } from "./config/env";
import authRoutes from "./routers/auth";
import articleRouter from "./routers/article.router";
import userRouter from "./routers/user.router";
import publicRouter from "./routers/public.router";
import { cors } from "hono/cors";
const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.get("/", (c) => {
  return c.json({ message: "API funcionando 🚀" });
});

app.route("/", authRoutes);
app.route("/", articleRouter);
app.route("/", userRouter);
app.route("/", publicRouter);
app.onError((err, c) => {
  console.error("Error:", err);

  return c.json(
    {
      message: "Error interno del servidor"
    },
    500
  );
});


async function start() {
  await connectDB();

  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
    },
    () => {
      console.log(
        `🚀 Servidor corriendo en http://localhost:${env.PORT}`
      );
    }
  );
}

start();