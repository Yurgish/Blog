import { FC } from "react";

interface ProfileIconProps {
    login: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({ login }) => {
    const displayText = login.trim().length > 0 ? login.substring(0, 1) : "?";
    return (
        <div className="w-16 h-16 bg-green text-black rounded-full flex justify-center items-center text-3xl capitalize max-xl:w-10 max-xl:h-10 max-xl:text-xl">
            {displayText}
        </div>
    );
};

export default ProfileIcon;
