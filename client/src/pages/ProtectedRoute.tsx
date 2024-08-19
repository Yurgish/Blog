import { FC, ReactNode } from "react";
import { useAppSelector } from "@hooks/store.hooks";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode;
    onlyAdmin?: boolean;
}

const ProtectedRoute: FC<Props> = ({ onlyAdmin = false, children }) => {
    const { isAdmin, isAuthorized } = useAppSelector((state) => state.userReducer);
    return !isAuthorized ? (
        <Navigate to="/login" replace />
    ) : onlyAdmin && !isAdmin ? (
        <Navigate to="/" replace />
    ) : (
        <>{children}</>
    );
};

export default ProtectedRoute;
