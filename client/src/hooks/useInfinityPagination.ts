import { useCallback, useState, useRef } from "react";
import { UnifiedPost } from "@models/postsApi.models";

interface UseInfinityPaginationProps {
  initialPage?: number;
}

const useInfinityPagination = ({ initialPage = 1 }: UseInfinityPaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const [posts, setPosts] = useState<UnifiedPost[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const postMapRef = useRef<Map<string, UnifiedPost>>(new Map());

  const addPosts = useCallback((newPosts: UnifiedPost[], hasMore: boolean) => {
    if (Array.isArray(newPosts)) {
      let updated = false;
      newPosts.forEach((post) => {
        if (!postMapRef.current.has(post._id)) {
          postMapRef.current.set(post._id, post);
          updated = true;
        }
      });
      if (updated) {
        setPosts(Array.from(postMapRef.current.values()));
      }
    } else {
      console.error("newPosts is not an array or is undefined", newPosts);
    }
    setHasMore(hasMore);
  }, []);

  const fetchMorePosts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { page, posts, hasMore, fetchMorePosts, addPosts };
};

export default useInfinityPagination;
