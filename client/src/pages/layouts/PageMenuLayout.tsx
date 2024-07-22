import { FC, ReactNode } from "react";
import Menu from "../../components/Menu";

interface PageMenuLayoutProps {
    children: ReactNode;
}

const PageMenuLayout: FC<PageMenuLayoutProps> = ({ children }) => {
    return (
        <div>
            <Menu />
            <div className="w-full flex flex-col items-center pt-16">{children}</div>
        </div>
    );
};

export default PageMenuLayout;
