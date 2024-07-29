import { FC, useCallback, useEffect } from "react";
import { IPostResponse, IModeratedPost, UnifiedPost } from "../models/postsApi.models";
import Post from "./Post";
import { htmlToPlainText } from "../utils/post.utils";
import Button from "./ui/Button";
import { AnimatePresence, DynamicAnimationOptions, motion, useAnimate } from "framer-motion";
import Reveal from "./animation/Reveal";
import { isModeratedPost, isPostResponse } from "../utils/post.typesGuard";

interface InfinityScrollPaginationProps {
    posts: UnifiedPost[] | undefined;
    fetchMorePosts: () => void;
    hasMore: boolean;
    isFetching: boolean;
}

const animationVariants = {
    hideButton: { opacity: 0, y: 20 },
    showButton: { opacity: 1, y: 0 },
};

const animationOptions = {
    short: { duration: 0.2 },
    delayed: { duration: 0.2, delay: 0.2 * 7, ease: "easeOut" },
};

const InfinityScrollPagination: FC<InfinityScrollPaginationProps> = ({
    posts,
    fetchMorePosts,
    hasMore,
    isFetching,
}) => {
    const [scope, animate] = useAnimate();

    console.log(hasMore, isFetching);

    const handleAnimation = useCallback(async () => {
        await animate("#animate-button", animationVariants.hideButton, animationOptions.short);
        fetchMorePosts();
    }, [animate, fetchMorePosts]);

    useEffect(() => {
        const showButton = async () => {
            await animate(
                "#animate-button",
                animationVariants.showButton,
                animationOptions.delayed as DynamicAnimationOptions
            );
        };
        if (!isFetching) {
            showButton();
        }
    }, [posts, animate, scope, isFetching]);

    return (
        <div ref={scope}>
            <div className="flex flex-col gap-8 max-sm:gap-5 mb-6">
                {posts &&
                    !isFetching &&
                    posts.map((post, i) => (
                        <Reveal elementNumber={i} width="100%" key={i}>
                            {isPostResponse(post) ? (
                                <Post
                                    title={post.title}
                                    summary={post.summary ? post.summary : htmlToPlainText(post.content)}
                                    createdAt={post.createdAt}
                                    id={post._id}
                                    authorEmail={post.author.email}
                                    tags={post.tags}
                                />
                            ) : isModeratedPost(post) ? (
                                <Post
                                    title={post.post.title}
                                    summary={post.post.summary ? post.post.summary : htmlToPlainText(post.post.content)}
                                    createdAt={post.createdAt}
                                    id={post._id}
                                    authorEmail={post.post.author.email}
                                    tags={post.post.tags}
                                />
                            ) : (
                                <div>Unknown post type</div>
                            )}
                        </Reveal>
                    ))}
            </div>
            <AnimatePresence>
                <motion.div id="animate-button" initial={{ opacity: 0, y: 20 }}>
                    {hasMore && !isFetching ? (
                        <Button onClick={handleAnimation} value="Load more posts" type="button"></Button>
                    ) : (
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            There are no posts to display.
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default InfinityScrollPagination;
