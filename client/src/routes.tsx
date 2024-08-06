import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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
import AdminPanelPage from "./pages/AdminPanelPage";

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
        path: "/post/moderated/:id",
        element: (
            <ProtectedRoute>
                <PostPage />
            </ProtectedRoute>
        ),
    },
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
            { path: "", element: <Navigate to="/user/accepted" replace /> },
        ],
    },
    {
        path: "/admin-panel",
        element: (
            <ProtectedRoute onlyAdmin={true}>
                <AdminPanelPage />
            </ProtectedRoute>
        ),
    },
]);

export const AppRouter: FC = () => {
    const { isFetching } = userApi.useCheckAuthQuery(null);
    return !isFetching && <RouterProvider router={router} />;
};
