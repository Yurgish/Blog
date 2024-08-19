import { IModeratedPost, IPostResponse, UnifiedPost } from "@models/postsApi.models";

export const isPostResponse = (post: UnifiedPost): post is IPostResponse => {
    return (post as IPostResponse)._id !== undefined && (post as IPostResponse).author !== undefined;
};

export const isModeratedPost = (post: UnifiedPost): post is IModeratedPost => {
    return (
        (post as IModeratedPost).post !== undefined &&
        (post as IModeratedPost).checks !== undefined &&
        (post as IModeratedPost).post.author !== undefined
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isServerError(error: any): error is { data?: { message?: string } } {
    return (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data !== null &&
        typeof error.data === "object" &&
        "message" in error.data
    );
}
