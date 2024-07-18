import { Request, Response } from "express";
import { Post } from "../models/post.model";
import { TokenRequest } from "../middleware/auth.middleware";

export const getPosts = async (req: Request, res: Response) => {
    try {
        const limit = req.body.limit || 10;
        const page = req.body.page || 1;

        const skip = (page - 1) * limit;

        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("author", "email");
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, summary, content, tags } = req.body;
        const userId = (req as TokenRequest).token.id;

        const newPost = new Post({
            title,
            summary,
            content,
            tags,
            author: userId,
        });
        await newPost.save();
        const populatedPost = await newPost.populate("author", "email");

        res.status(201).json({ message: "Post created successfully", post: populatedPost });
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
        const userRoles = (req as TokenRequest).token.role;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== userId && !userRoles.includes("ADMIN")) {
            return res.status(403).json({ message: "You are not authorized to edit this post" });
        }

        post.title = title || post.title;
        post.summary = summary || post.summary;
        post.content = content || post.content;
        post.tags = tags || post.tags;

        await post.save();
        const populatedPost = await post.populate("author", "email");
        res.status(200).json({ message: "Post updated successfully", populatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Error updating post" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        res.status(200).json({ post });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

// export const searchPostsByTag = async (req: Request, res: Response) => {
//     try {
//         const tag = req.body.tag as string;
//         if (!tag) {
//             return res.status(400).json({ message: "Tag query parameter is required" });
//         }

//         const posts = await Post.find({ tags: tag }).populate('author', 'login');
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error("Error searching posts by tag:", error);
//         res.status(500).json({ message: "Error searching posts by tag" });
//     }
// };
