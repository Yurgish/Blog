import { IModeratedPost, IPostResponse, UnifiedPost } from "../models/postsApi.models";

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
