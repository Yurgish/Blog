import React from "react";
import ProfileIcon from "./ProfileIcon";
import AddIcon from "./icons/AddIcon";
import SearchIcon from "./icons/SearchIcon";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/store.hooks";
import { userApi } from "../services/user.service";

const Menu = () => {
    const { user, isAuthorized } = useAppSelector((state) => state.userReducer);
    const [logoutUser] = userApi.useLogoutUserMutation();
    return (
        <div className="flex flex-col items-center justify-between w-24 border-r-2 border-green py-24 fixed top-0 left-0 bottom-0 h-full">
            <div className="flex flex-col gap-6">
                {isAuthorized && user && <ProfileIcon login={user.login} />}
                <button className="flex flex-col items-center">
                    <SearchIcon />
                    <p className="text-white">search</p>
                </button>
                {isAuthorized && (
                    <Link to="/createPost" className="flex flex-col items-center">
                        <AddIcon />
                        <p className="text-white">create</p>
                    </Link>
                )}
            </div>
            <div className="text-white flex justify-center border-t-2 border-green w-full">
                <div className="flex flex-col py-3">
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
