import { Hono } from "hono";
import { requireAuth, type AuthEnv } from "../middleware/auth";

const userRouter = new Hono<AuthEnv>();

userRouter.get("/me", requireAuth, (c) => {
  const user = c.get("user");
  return c.json({ user });
});

export default userRouter;