import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, IUserLogin, IUserRegister } from "../models/userApi.models";

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
        }),
        loginUser: builder.mutation<IAuthResponse, IUserLogin>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
    }),
});
