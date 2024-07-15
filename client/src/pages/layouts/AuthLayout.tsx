import { FC } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
    authTitle: string;
    welcomeText: string;
}

// Add responsible layout

const AuthLayout: FC<AuthLayoutProps> = ({ children, authTitle, welcomeText }) => {
    return (
        <div className="w-full flex h-screen">
            <div className="flex-[1_1_26%] h-full relative ">
                <div className="flex w-full h-full justify-center items-center border-r-4 border-green">
                    <h1 className="[writing-mode:vertical-lr] transform -rotate-180 font-bold text-6xl text-white">
                        {authTitle}
                    </h1>
                </div>
                <div className="w-full h-full absolute top-0 left-0 z-[-1] bg-[rgba(39,39,39,0.28)]"></div>
                <img
                    className="object-cover h-full absolute top-0 left-0 z-[-2]"
                    src="/auth-background.png"
                    alt="auth background"
                />
            </div>
            <div className="flex-[1_1_74%]">
                <div className="mx-auto max-w-[600px] flex flex-col justify-center h-full">
                    <div>
                        <h1 className="font-serif text-white text-5xl">Welcome</h1>
                        <p className="font-light text-2xl text-grey mb-11">{welcomeText}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
