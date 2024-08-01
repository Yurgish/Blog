import AddIcon from "./icons/AddIcon";
import SearchIcon from "./icons/SearchIcon";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/store.hooks";
import { userApi } from "../services/user.service";
import ProfileIcon from "./ui/ProfileIcon";

const Menu = () => {
    const { user, isAuthorized } = useAppSelector((state) => state.userReducer);
    const [logoutUser] = userApi.useLogoutUserMutation();
    return (
        <div className="flex flex-col items-center justify-between w-24 border-r-2 border-green py-24 fixed top-0 left-0 bottom-0 h-full bg-background-black max-xl:flex-row max-xl:h-auto max-xl:w-auto max-xl:top-auto max-xl:border-2 max-xl:py-2 max-xl:px-5 max-xl:left-14 max-xl:right-14 z-10 max-xl:bottom-4 max-sm:bottom-0 max-sm:left-0 max-sm:right-0 ">
            <div className="flex flex-col gap-6 max-xl:flex-row max-xl:gap-16 max-sm:gap-6">
                {isAuthorized && user && (
                    <Link to="/user">
                        <ProfileIcon login={user.login} />
                    </Link>
                )}
                <button className="flex flex-col items-center max-xl:flex-row max-xl:gap-2">
                    <SearchIcon />
                    <p className="text-white max-sm:hidden">search</p>
                </button>
                {isAuthorized && (
                    <Link to="/create-post" className="flex flex-col items-center max-xl:flex-row max-xl:gap-2">
                        <AddIcon />
                        <p className="text-white max-sm:hidden">create</p>
                    </Link>
                )}
            </div>
            <div className="text-white flex justify-center border-t-2 border-green w-full max-xl:border-0 max-xl:w-auto">
                <div className="flex flex-col py-3 max-xl:p-0">
                    {isAuthorized ? (
                        <button onClick={logoutUser} className="hover:underline hover:text-green">
                            log-out
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline hover:text-green">
                                log-in
                            </Link>
                            <Link to="/register" className="hover:underline hover:text-green">
                                sign-up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
