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
    __v: number;
}

interface IAuthor {
    _id: string;
    email: string;
}

export interface IPostResponseWithMessage {
    message: string;
    post: IPostResponse;
}
