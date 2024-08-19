import { useState } from "react";
import { UnifiedPost } from "@models/postsApi.models";

interface UseInfinityPaginationProps {
    initialPage?: number;
}

const useInfinityPagination = ({ initialPage = 1 }: UseInfinityPaginationProps) => {
    const [page, setPage] = useState(initialPage);
    const [posts, setPosts] = useState<UnifiedPost[]>([]);
    const [hasMore, setHasMore] = useState(false);

    const addPosts = (newPosts: UnifiedPost[], hasMore: boolean) => {
        if (Array.isArray(newPosts)) {
            setPosts((prevPosts) => {
                const postMap = new Map(prevPosts.map((post) => [post._id, post]));
                newPosts.forEach((post) => postMap.set(post._id, post));
                return Array.from(postMap.values());
            });
        } else {
            console.error("newPosts is not an array or is undefined", newPosts);
        }
        setHasMore(hasMore);
    };

    const fetchMorePosts = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return { page, posts, hasMore, fetchMorePosts, addPosts };
};

export default useInfinityPagination;
