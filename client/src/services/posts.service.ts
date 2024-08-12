import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IModeratedPost,
    IModeratedPostResponse,
    IPost,
    IPostResponse,
    IPostResponseWithMessage,
} from "../models/postsApi.models";
import { handleApiError, notify } from "../utils/notifications.utils";
import { handleProgressBar } from "../utils/progressBar.utils";

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
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
        }),
        getPostById: builder.query<IPostResponse | IModeratedPost, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "GET",
            }),
            providesTags: ["Posts", "ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
        }),
        createPost: builder.mutation<IPostResponseWithMessage, IPost>({
            query: (post) => ({
                url: "/post",
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                try {
                    const { data } = await queryFulfilled;
                    notify(data.message, "success");
                } catch (error) {
                    handleApiError(error);
                } finally {
                    handleProgressBar("complete");
                }
            },
        }),
        updatePost: builder.mutation<IPostResponseWithMessage, { postId: string; updatedPost: IPost }>({
            query: ({ postId, updatedPost }) => ({
                url: `/post/${postId}`,
                method: "PUT",
                body: updatedPost,
            }),
            invalidatesTags: ["Posts", "ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                try {
                    const { data } = await queryFulfilled;
                    notify(data.message, "success");
                } catch (error) {
                    handleApiError(error);
                } finally {
                    handleProgressBar("complete");
                }
            },
        }),
        deletePost: builder.mutation<{ message: string }, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                try {
                    const { data } = await queryFulfilled;
                    notify(data.message, "success");
                } catch (error) {
                    handleApiError(error);
                } finally {
                    handleProgressBar("complete");
                }
            },
        }),
        getModeratedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
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
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
        }),
        getRejectedPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/rejected`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
        }),
        getPendingPosts: builder.query<IModeratedPostResponse, { limit?: number; page?: number }>({
            query: ({ limit = 10, page = 1 }) => ({
                url: `/posts/moderated/pending`,
                method: "GET",
                params: { limit, page },
            }),
            providesTags: ["ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                await queryFulfilled.finally(() => handleProgressBar("complete"));
            },
        }),
        confirmPost: builder.mutation<{ message: string }, string>({
            query: (postId) => ({
                url: `/post/confirm/${postId}`,
                method: "POST",
            }),
            invalidatesTags: ["Posts", "ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                try {
                    const { data } = await queryFulfilled;
                    notify(data.message, "success");
                } catch (error) {
                    handleApiError(error);
                } finally {
                    handleProgressBar("complete");
                }
            },
        }),
        refusePost: builder.mutation<{ message: string }, { message: string; postId: string }>({
            query: ({ postId, message }) => ({
                url: `/post/refuse/${postId}`,
                method: "PUT",
                body: { message },
            }),
            invalidatesTags: ["ModeratedPosts"],
            onQueryStarted: async (_, { queryFulfilled }) => {
                handleProgressBar("start");
                try {
                    const { data } = await queryFulfilled;
                    notify(data.message, "success");
                } catch (error) {
                    handleApiError(error);
                } finally {
                    handleProgressBar("complete");
                }
            },
        }),
    }),
});
