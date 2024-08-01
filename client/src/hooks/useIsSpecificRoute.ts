import { useLocation } from "react-router-dom";

const useIsSpecificRoute = (route: string): boolean => {
    const location = useLocation();
    return location.pathname === route;
};

export default useIsSpecificRoute;
