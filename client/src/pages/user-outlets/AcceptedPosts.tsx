import { useEffect } from "react";
import InfinityScrollPagination from "../../components/InfinityScrollPagination";
import useInfinityPagination from "../../hooks/useInfinityPagination";
import { postsApi } from "../../services/posts.service";

const AcceptedPosts = () => {
    const { page, posts, hasMore, fetchMorePosts, addPosts } = useInfinityPagination({});
    const { data, isFetching } = postsApi.useGetAcceptedPostsQuery({ limit: 3, page });

    useEffect(() => {
        if (data && data.posts !== posts) {
            addPosts(data.posts, data.hasMore);
        }
    }, [data]);

    return (
        <InfinityScrollPagination
            posts={posts}
            fetchMorePosts={fetchMorePosts}
            hasMore={hasMore && !isFetching}
            isFetching={isFetching}
        />
    );
};

export default AcceptedPosts;
