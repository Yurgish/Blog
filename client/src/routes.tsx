import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FC } from "react";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import { userApi } from "./services/user.service";
import EditPostPage from "./pages/EditPostPage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import AcceptedPosts from "./pages/user-outlets/AcceptedPosts";
import RejectedPosts from "./pages/user-outlets/RejectedPosts";
import PendingPosts from "./pages/user-outlets/PendingPosts";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    {
        path: "/create-post",
        element: (
            <ProtectedRoute>
                <CreatePostPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/edit-post/:id",
        element: (
            <ProtectedRoute>
                <EditPostPage />
            </ProtectedRoute>
        ),
    },
    { path: "/post/:id", element: <PostPage /> },
    {
        path: "/user",
        element: (
            <ProtectedRoute>
                <UserPage />
            </ProtectedRoute>
        ),
        children: [
            { path: "accepted", element: <AcceptedPosts /> },
            { path: "rejected", element: <RejectedPosts /> },
            { path: "pending", element: <PendingPosts /> },
            { path: "", element: <AcceptedPosts /> },
        ],
    },
]);

export const AppRouter: FC = () => {
    const { isFetching } = userApi.useCheckAuthQuery(null);
    return !isFetching && <RouterProvider router={router} />;
};
