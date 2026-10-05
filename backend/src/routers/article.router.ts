import { Hono } from "hono";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  addComment
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
  requireAuth,
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
router.post(
  "/articles/:id/comments",
  requireAuth,
  addComment
);

export default router;