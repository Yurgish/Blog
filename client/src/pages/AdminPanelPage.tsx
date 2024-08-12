import { useEffect } from "react";
import InfinityScrollPagination from "../components/InfinityScrollPagination";
import useInfinityPagination from "../hooks/useInfinityPagination";
import { postsApi } from "../services/posts.service";
import PageMenuLayout from "./layouts/PageMenuLayout";

const AdminPanelPage = () => {
    const { page, posts, hasMore, fetchMorePosts, addPosts } = useInfinityPagination({});
    const { data, isFetching } = postsApi.useGetModeratedPostsQuery({ limit: 10, page });

    useEffect(() => {
        if (data && data.posts !== posts) {
            addPosts(data.posts, data.hasMore);
        }
    }, [data]);

    return (
        <PageMenuLayout>
            <InfinityScrollPagination
                posts={posts}
                fetchMorePosts={fetchMorePosts}
                hasMore={hasMore && !isFetching}
                isFetching={isFetching}
            />
        </PageMenuLayout>
    );
};

export default AdminPanelPage;
