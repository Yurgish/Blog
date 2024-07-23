import { FC } from "react";

interface ProfileIconProps {
    icon?: string;
    login: string;
}

const ProfileIcon: FC<ProfileIconProps> = ({ icon, login }) => {
    return (
        <div className="w-16 h-16 bg-green text-black rounded-full flex justify-center items-center text-3xl capitalize max-xl:w-10 max-xl:h-10 max-xl:text-xl">
            {login.substring(0, 1)}
        </div>
    );
};

export default ProfileIcon;
