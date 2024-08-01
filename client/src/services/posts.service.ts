import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IModeratedPost,
    IModeratedPostResponse,
    IPost,
    IPostResponse,
    IPostResponseWithMessage,
} from "../models/postsApi.models";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
export const postsApi = createApi({
    reducerPath: "postsApi",
    tagTypes: ["Post"],
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_API_URL, credentials: "include" }),
    endpoints: (builder) => ({
        getPosts: builder.query<{ posts: IPostResponse[]; hasMore: boolean }, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["Post"],
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
            invalidatesTags: ["Post"],
        }),
        deletePost: builder.mutation<{ message: string }, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post"],
        }),
        getModeratedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated`,
                method: "GET",
                params: { limit, page },
            }),
        }),
        getModeratedPostById: builder.query<IModeratedPost, string>({
            query: (postId) => ({
                url: `/post/moderated/${postId}`,
                method: "GET",
            }),
        }),
        getAcceptedPosts: builder.query<
            { posts: IPostResponse[]; hasMore: boolean },
            { limit?: number; page?: number }
        >({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/accepted`,
                method: "GET",
                params: { limit, page },
            }),
        }),
        getRejectedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/rejected`,
                method: "GET",
                params: { limit, page },
            }),
        }),
        getPendingPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/pending`,
                method: "GET",
                params: { limit, page },
            }),
        }),
    }),
});
