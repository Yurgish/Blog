import PostsContainer from "@components/PostsContainer";
import PageMenuLayout from "@pages/layouts/PageMenuLayout";

const HomePage = () => {
    return (
        <PageMenuLayout>
            <PostsContainer />
        </PageMenuLayout>
    );
};

export default HomePage;
