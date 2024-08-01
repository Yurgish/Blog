import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPost, deletePostById, getPostById, getPosts, updatePost } from "../controllers/post.controller";
import { createPostValidation, updatePostValidation } from "../middleware/post.validation";
import { adminMiddleware } from "../middleware/admin.middleware";
import {
    confirmModeratedPost,
    getAcceptedPosts,
    getModeratedPostById,
    getModeratedPosts,
    getPendingPosts,
    getRejectedPosts,
    refuseModeratedPost,
} from "../controllers/moderatedPost.contreller";

const router = Router();

router.post("/post", authMiddleware, createPostValidation, createPost);
router.get("/posts", getPosts);
router.put("/post/:id", authMiddleware, updatePostValidation, updatePost);
router.get("/post/:id", getPostById);
router.delete("/post/:id", authMiddleware, deletePostById);

router.post("/post/confirm/:id", authMiddleware, adminMiddleware, confirmModeratedPost);
router.put("/post/refuse/:id", authMiddleware, adminMiddleware, refuseModeratedPost);

router.get("/posts/moderated", authMiddleware, adminMiddleware, getModeratedPosts);
router.get("/post/moderated/:id", authMiddleware, getModeratedPostById);
router.get("/posts/accepted", authMiddleware, getAcceptedPosts);
router.get("/posts/moderated/rejected", authMiddleware, getRejectedPosts);
router.get("/posts/moderated/pending", authMiddleware, getPendingPosts);

export default router;
