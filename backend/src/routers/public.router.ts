import { Hono } from "hono";
import {
  getAuthors,
  searchArticles,
} from "../controllers/public.controller";

const publicRouter = new Hono();

publicRouter.get("/public/authors", getAuthors);

publicRouter.get("/public/articles", searchArticles);

export default publicRouter;