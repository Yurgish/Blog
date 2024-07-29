export interface IPost {
    title: string;
    summary?: string;
    content: string;
    tags?: string[];
}

export interface IPostResponse extends IPost {
    _id: string;
    author: IAuthor;
    createdAt: string;
    updatedAt: string;
}

export interface IModeratedPost {
    _id: string;
    post: IUsersModeratedPost;
    checks: number;
    isRefused: boolean;
    adminMessage: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IUsersModeratedPost extends IPost {
    author: IAuthor;
}

interface IAuthor {
    _id: string;
    email: string;
}

export interface IModeratedPostResponse {
    posts: IModeratedPost[];
    hasMore: boolean;
}

export interface IPostResponseWithMessage {
    message: string;
    post: IPostResponse;
}

export type UnifiedPost = IPostResponse | IModeratedPost;
