import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IPostResponse, IPostResponseWithMessage } from "../models/postsApi.models";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_API_URL, credentials: "include" }),
    endpoints: (builder) => ({
        getPosts: builder.query<{ posts: IPostResponse[] }, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts`,
                method: "GET",
                params: { limit, page },
            }),
        }),
        getPostById: builder.query<IPostResponse, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "GET",
            }),
        }),
        createPost: builder.mutation<IPostResponseWithMessage, IPost>({
            query: (post) => ({
                url: "/post",
                method: "POST",
                body: post,
            }),
        }),
        updatePost: builder.mutation<IPostResponseWithMessage, { postId: string; updatedPost: IPost }>({
            query: ({ postId, updatedPost }) => ({
                url: `/post/${postId}`,
                method: "PUT",
                body: updatedPost,
            }),
        }),
    }),
});
