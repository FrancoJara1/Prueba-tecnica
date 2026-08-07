import { Hono } from "hono";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} from "../controllers/article.controller";
import { requireAuth } from "../middleware/auth";


const router = new Hono();


router.post(
  "/articles",
  requireAuth ,
  createArticle
);

router.get(
  "/articles",
  getArticles
);
router.get(
    "/articles/:id",
    getArticleById
)
router.put(
    "/articles/:id",
    requireAuth,
    updateArticle
)

router.delete(
    "/articles/:id",
    requireAuth,
    deleteArticle
)

export default router;