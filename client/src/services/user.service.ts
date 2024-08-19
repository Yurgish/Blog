import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, IUserLogin, IUserRegister } from "@models/userApi.models";
import { handleApiError, notify } from "@utils/notifications.utils";
import { handleProgressBar } from "@utils/progressBar.utils";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_API_URL, credentials: "include" }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<IAuthResponse, IUserRegister>({
            query: (newUser) => ({
                url: "/auth/register",
                method: "POST",
                body: newUser,
            }),
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
        loginUser: builder.mutation<IAuthResponse, IUserLogin>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
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
        logoutUser: builder.mutation<{ message: string }, null>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
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
        checkAuth: builder.query({
            query: () => "/auth/check-auth",
        }),
    }),
});
