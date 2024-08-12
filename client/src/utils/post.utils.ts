import { IModeratedPost, IPostResponse } from "../models/postsApi.models";
import { isPostResponse } from "./typesGuard";

export const htmlToPlainText = (html: string): string => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    let text = tempElement.textContent || tempElement.innerText || "";

    text = text.replace(/([a-z])([A-Z])/g, "$1. $2");

    if (text.length > 0 && text[text.length - 1] !== ".") {
        text += ".";
    }

    return text.trim();
};

export const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
};

export const transformEmail = (email: string): string => {
    if (!email) return "";
    return "@" + email.split("@")[0];
};

export const cleanTags = (tags: string[]): string[] => {
    return tags.map((tag) => tag.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
};

export const addHashtags = (tags: string[]): string[] => {
    return tags.map((tag) => `#${tag}`);
};

export const splitTags = (tags: string): string[] => {
    return tags.split(",").map((tag) => tag.trim());
};

export const isAuthorOfPost = (userEmail: string, postAuthorEmail: string): boolean => {
    return userEmail === postAuthorEmail;
};

type DateFormatOptions = {
    day?: boolean;
    month?: boolean;
    year?: boolean;
};

export const formatDate = (
    dateString: string,
    options: DateFormatOptions = { day: true, month: true, year: true }
): string => {
    const date = new Date(dateString);
    const parts = [];

    if (options.day) {
        parts.push(date.getDate());
    }
    if (options.month) {
        parts.push(date.toLocaleString("en", { month: "short" }));
    }
    if (options.year) {
        parts.push(date.getFullYear());
    }

    return parts.join(" ");
};

export const transformModeratedPostToPostResponse = (moderatedPost: IModeratedPost | IPostResponse): IPostResponse => {
    if (isPostResponse(moderatedPost)) return moderatedPost;
    return {
        _id: moderatedPost._id,
        title: moderatedPost.post.title,
        summary: moderatedPost.post.summary,
        content: moderatedPost.post.content,
        tags: moderatedPost.post.tags,
        author: moderatedPost.post.author,
        createdAt: moderatedPost.createdAt,
        updatedAt: moderatedPost.updatedAt,
    };
};
