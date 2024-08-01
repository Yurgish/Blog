import { useEffect } from "react";
import useInfinityPagination from "../hooks/useInfinityPagination";
import { postsApi } from "../services/posts.service";
import InfinityScrollPagination from "./InfinityScrollPagination";

const PostsContainer = () => {
    const { page, posts, hasMore, fetchMorePosts, addPosts } = useInfinityPagination({});
    const { data, isLoading } = postsApi.useGetPostsQuery({ limit: 5, page });

    useEffect(() => {
        if (data && data.posts !== posts) {
            addPosts(data.posts, data.hasMore);
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-10 min-h-screen">
            <div className="text-white text-xl w-full max-sm:justify-center max-sm:flex">
                <div className="flex flex-col items-center max-w-16 max-lg:w-auto ">
                    <div className="bg-green w-5 h-1 mb-1"></div>
                    <p>Latest</p>
                </div>
            </div>
            <InfinityScrollPagination
                posts={posts}
                isFetching={isLoading}
                hasMore={hasMore && !isLoading}
                fetchMorePosts={fetchMorePosts}
            />
        </div>
    );
};

export default PostsContainer;
