import Menu from "../components/Menu";
import PostsContainer from "../components/PostsContainer";
import PageMenuLayout from "./layouts/PageMenuLayout";

const HomePage = () => {
    return (
        <PageMenuLayout>
            <PostsContainer />
        </PageMenuLayout>
    );
};

export default HomePage;
