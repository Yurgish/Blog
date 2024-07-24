import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPost, getPostById, getPosts, updatePost } from "../controllers/post.controller";
import { createPostValidation } from "../middleware/post.validation";

const router = Router();

router.post("/post", authMiddleware, createPostValidation, createPost);
router.get("/posts", getPosts);
router.put("/post/:id", authMiddleware, updatePost);
router.get("/post/:id", getPostById);

export default router;
