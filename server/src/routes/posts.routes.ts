import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPost, deletePostById, getPostById, getPosts, updatePost } from "../controllers/post.controller";
import { createPostValidation, updatePostValidation } from "../middleware/post.validation";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.post("/post", authMiddleware, createPostValidation, createPost);
router.get("/posts", getPosts);
router.put("/post/:id", authMiddleware, adminMiddleware, updatePostValidation, updatePost);
router.get("/post/:id", getPostById);
router.delete("/post/:id", authMiddleware, adminMiddleware, deletePostById);

export default router;
