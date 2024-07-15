import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FC } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>HomePage</div>,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

export const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};
