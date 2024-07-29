import { FC, ReactNode } from "react";
import Menu from "../../components/Menu";
import PageWrapperLayout from "./PageWrapperLayout";

interface PageMenuLayoutProps {
    children: ReactNode;
}

const PageMenuLayout: FC<PageMenuLayoutProps> = ({ children }) => {
    return (
        <div>
            <Menu />
            <PageWrapperLayout>{children}</PageWrapperLayout>
        </div>
    );
};

export default PageMenuLayout;
