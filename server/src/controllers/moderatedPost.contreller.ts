import { Request, Response } from "express";
import { Post } from "../models/post.model";
import { ModerationPost } from "../models/postOnInspection.model";
import { TokenRequest } from "../middleware/auth.middleware";

// Confirm in acception of post
export const confirmModeratedPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const moderatedPost = await ModerationPost.findById(postId);
        if (!moderatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const { title, summary, content, tags, author } = moderatedPost.post;

        const confirmedPost = new Post({ title, summary, content, tags, author });
        await confirmedPost.save();
        await ModerationPost.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post confirmed successfully" });
    } catch (error) {
        console.error("Error confirming post:", error);
        res.status(500).json({ message: "Error confirming post" });
    }
};

// Refuse in acception of post
export const refuseModeratedPost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { message } = req.body;
        const post = await ModerationPost.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.isRefused) {
            return res.status(404).json({ message: "You cannot refuse refused post" });
        }
        if (!message) {
            return res.status(404).json({ message: "Notification is mandatory" });
        }
        post.adminMessage = message;
        post.checks++;
        post.isRefused = true;
        post.save();

        res.status(200).json({ message: "Post refused successfully" });
    } catch (error) {
        console.error("Error confirming post:", error);
        res.status(500).json({ message: "Error confirming post" });
    }
};

//Get all moderated posts (for admins)
export const getModeratedPosts = async (req: Request, res: Response) => {
    try {
        const limit = req.body.limit || 10;
        const page = req.body.page || 1;

        const skip = (page - 1) * limit;

        const posts = await ModerationPost.find({ isRefused: false })
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .populate("post.author", "email");
        const totalPosts = await ModerationPost.countDocuments();
        const hasMore = totalPosts > page * limit;
        res.status(200).json({ posts, hasMore });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

// Get all accepted posts for a user
export const getAcceptedPosts = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const page = parseInt(req.query.page as string) || 1;

        const skip = (page - 1) * limit;

        const userId = (req as TokenRequest).token.id;
        const posts = await Post.find({ author: userId }).skip(skip).limit(limit).populate("author", "email");
        const totalPosts = await Post.countDocuments({ author: userId });
        const hasMore = totalPosts > page * limit;
        res.status(200).json({ posts, hasMore });
    } catch (error) {
        console.error("Error fetching accepted posts:", error);
        res.status(500).json({ message: "Error fetching accepted posts" });
    }
};

// Get all rejected posts for a user
export const getRejectedPosts = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const page = parseInt(req.query.page as string) || 1;

        const skip = (page - 1) * limit;

        const userId = (req as TokenRequest).token.id;
        const rejectedPosts = await ModerationPost.find({ "post.author": userId, isRefused: true })
            .skip(skip)
            .limit(limit)
            .populate("post.author", "email");
        const totalPosts = await ModerationPost.countDocuments({ "post.author": userId, isRefused: true });
        const hasMore = totalPosts > page * limit;
        res.status(200).json({ posts: rejectedPosts, hasMore });
    } catch (error) {
        console.error("Error fetching rejected posts:", error);
        res.status(500).json({ message: "Error fetching rejected posts" });
    }
};

// Get all pending posts for a user
export const getPendingPosts = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const page = parseInt(req.query.page as string) || 1;

        const skip = (page - 1) * limit;

        const userId = (req as TokenRequest).token.id;
        const pendingPosts = await ModerationPost.find({ "post.author": userId, isRefused: false })
            .skip(skip)
            .limit(limit)
            .populate("post.author", "email");
        const totalPosts = await ModerationPost.countDocuments({ "post.author": userId, isRefused: false });
        const hasMore = totalPosts > page * limit;
        res.status(200).json({ posts: pendingPosts, hasMore });
    } catch (error) {
        console.error("Error fetching pending posts:", error);
        res.status(500).json({ message: "Error fetching pending posts" });
    }
};
