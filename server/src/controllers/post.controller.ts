import { Request, Response } from "express";
import { Post } from "../models/post.model";
import { TokenRequest } from "../middleware/auth.middleware";
import { ModerationPost } from "../models/postOnInspection.model";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 10;
        const page = parseInt(req.query.page as string) || 1;

        const skip = (page - 1) * limit;

        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("author", "email");
        const totalPosts = await Post.countDocuments();
        const hasMore = totalPosts > page * limit;
        res.status(200).json({ posts, hasMore });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, summary, content, tags } = req.body;
        const userId = (req as TokenRequest).token.id;

        const newModerationPost = new ModerationPost({
            post: {
                title,
                summary,
                content,
                tags,
                author: userId,
            },
            checks: 0,
            isRefused: false,
            adminMessage: "",
        });
        await newModerationPost.save();

        res.status(201).json({ message: "Post created successfully and is under moderation" });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Error creating post" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const { title, summary, content, tags } = req.body;
        const userId = (req as TokenRequest).token.id;

        let post = await Post.findById(postId);

        if (post) {
            if (post.author.toString() !== userId) {
                return res.status(403).json({ message: "You are not authorized to edit this post" });
            }

            await Post.findByIdAndDelete(postId);

            const newModeratedPost = new ModerationPost({
                post: {
                    title: title || post.title,
                    summary: summary || post.summary,
                    content: content || post.content,
                    tags: tags || post.tags,
                    author: post.author,
                },
                checks: 0,
                isRefused: false,
                adminMessage: "",
            });

            await newModeratedPost.save();
            return res.status(200).json({ message: "Post moved to moderation and updated successfully" });
        } else {
            const moderatedPost = await ModerationPost.findById(postId);

            if (!moderatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }

            if (moderatedPost.post.author.toString() !== userId) {
                return res.status(403).json({ message: "You are not authorized to edit this post" });
            }

            moderatedPost.post.title = title || moderatedPost.post.title;
            moderatedPost.post.summary = summary || moderatedPost.post.summary;
            moderatedPost.post.content = content || moderatedPost.post.content;
            moderatedPost.post.tags = tags || moderatedPost.post.tags;
            moderatedPost.isRefused = false;

            await moderatedPost.save();
            return res.status(200).json({ message: "Moderated post updated successfully" });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Error updating post" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (post) {
            const populatedPost = await post.populate("author", "email");
            res.status(200).json(populatedPost);
        } else {
            const moderatedPost = await ModerationPost.findById(postId);
            if (!moderatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            const populatedModeratedPost = await moderatedPost.populate("post.author", "email");
            res.status(200).json(populatedModeratedPost);
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const deletePostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Error deleting post" });
    }
};
