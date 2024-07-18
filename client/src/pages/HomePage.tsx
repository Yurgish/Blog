import React from "react";
import { useAppSelector } from "../hooks/store.hooks";
import { Link } from "react-router-dom";
import { userApi } from "../services/user.service";
import ProfileIcon from "../components/ProfileIcon";

const HomePage = () => {
    const [logoutTrigger, { error }] = userApi.useLogoutUserMutation();
    const logoutHandler = () => {
        try {
            logoutTrigger(null).unwrap();
        } catch (error) {
            console.log(error);
        }
    };
    const user = useAppSelector((state) => state.userReducer.user);
    return (
        <div>
            {user ? (
                <p>
                    {user.login}, {user.email}
                </p>
            ) : (
                <p>not authurizatied</p>
            )}
            <Link to="/login">Login</Link>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default HomePage;
