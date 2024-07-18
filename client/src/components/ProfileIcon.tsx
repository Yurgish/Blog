import React, { FC } from "react";

interface ProfileIconProps {
    icon?: string;
    login: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({ icon, login }) => {
    return (
        <div className="w-16 h-16 bg-green rounded-full flex justify-center items-center text-3xl capitalize">
            {login.substring(0, 1)}
        </div>
    );
};

export default ProfileIcon;
