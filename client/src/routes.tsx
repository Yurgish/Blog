import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FC } from "react";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import { userApi } from "./services/user.service";
import EditPostPage from "./pages/EditPostPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/create-post",
        element: <CreatePostPage />,
    },
    {
        path: "/edit-post/:id",
        element: <EditPostPage />,
    },
]);

export const AppRouter: FC = () => {
    const { isFetching } = userApi.useCheckAuthQuery(null);
    return <RouterProvider router={router} />;
};
