import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPost, getPosts, updatePost } from "../controllers/post.controller";

const router = Router();

router.post("/post", authMiddleware, createPost);
router.get("/posts", getPosts);
router.put("/post/:id", authMiddleware, updatePost);
router.get("/post/:id", updatePost);

export default router;
