import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { connectDB } from "./database/mongodb";
import { env } from "./config/env";
import authRoutes from "./routers/auth";
import articleRouter from "./routers/article.router";
import userRouter from "./routers/user.router";
import publicRouter from "./routers/public.router";
import dns from "node:dns";
const app = new Hono();
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
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