import { useEffect } from "react";
import InfinityScrollPagination from "../../components/InfinityScrollPagination";
import useInfinityPagination from "../../hooks/useInfinityPagination";
import { postsApi } from "../../services/posts.service";

const PendingPosts = () => {
    const { page, posts, hasMore, fetchMorePosts, addPosts } = useInfinityPagination({});
    const { data, isFetching } = postsApi.useGetPendingPostsQuery({ limit: 10, page });

    useEffect(() => {
        if (data && data.posts) {
            addPosts(data.posts, data.hasMore);
        }
    }, [addPosts, data]);

    return (
        <InfinityScrollPagination
            posts={posts}
            fetchMorePosts={fetchMorePosts}
            hasMore={hasMore && !isFetching}
            isFetching={isFetching}
        />
    );
};

export default PendingPosts;
