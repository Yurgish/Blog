import { FC, ReactNode } from "react";

interface PageWrapperLayoutProps {
    children: ReactNode;
}

const PageWrapperLayout: FC<PageWrapperLayoutProps> = ({ children }) => {
    return (
        <div className="w-full flex justify-center items-center min-h-screen">
            <div className="max-w-[1000px] w-full max-lg:px-6 max-lg:w-full py-14">{children}</div>
        </div>
    );
};

export default PageWrapperLayout;
