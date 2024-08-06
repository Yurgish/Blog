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
    tagTypes: ["Posts", "ModeratedPosts"],
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_API_URL, credentials: "include" }),
    endpoints: (builder) => ({
        getPosts: builder.query<{ posts: IPostResponse[]; hasMore: boolean }, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["Posts"],
        }),
        getPostById: builder.query<IPostResponse | IModeratedPost, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "GET",
            }),
            providesTags: ["Posts", "ModeratedPosts"],
        }),
        createPost: builder.mutation<IPostResponseWithMessage, IPost>({
            query: (post) => ({
                url: "/post",
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["ModeratedPosts"],
        }),
        updatePost: builder.mutation<IPostResponseWithMessage, { postId: string; updatedPost: IPost }>({
            query: ({ postId, updatedPost }) => ({
                url: `/post/${postId}`,
                method: "PUT",
                body: updatedPost,
            }),
            invalidatesTags: ["ModeratedPosts"],
        }),
        deletePost: builder.mutation<{ message: string }, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"],
        }),
        getModeratedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
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
            providesTags: ["Posts"],
        }),
        getRejectedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/rejected`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
        }),
        getPendingPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/pending`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
        }),
        confirmPost: builder.mutation<{ message: string }, string>({
            query: (postId) => ({
                url: `/post/confirm/${postId}`,
                method: "POST",
            }),
            invalidatesTags: ["Posts"],
        }),
        refusePost: builder.mutation<{ message: string }, { message: string; postId: string }>({
            query: ({ postId, message }) => ({
                url: `/post/refuse/${postId}`,
                method: "PUT",
                body: { message },
            }),
            invalidatesTags: ["ModeratedPosts"],
        }),
    }),
});
