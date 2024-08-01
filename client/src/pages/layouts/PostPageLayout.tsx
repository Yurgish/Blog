import UpdatePostControls from "../../components/UpdatePostControls";
import { useAppSelector } from "../../hooks/store.hooks";
import { IModeratedPost, IPostResponse } from "../../models/postsApi.models";
import { isModeratedPost, isPostResponse } from "../../utils/post.typesGuard";
import { formatDate, isAuthorOfPost, transformEmail } from "../../utils/post.utils";

interface PostPageLayoutProps {
    post: IPostResponse | IModeratedPost;
}

const PostPageLayout = ({ post }: PostPageLayoutProps) => {
    const { user, isAdmin } = useAppSelector((state) => state.userReducer);
    if (isPostResponse(post)) {
        return (
            <div className="w-full mb-7">
                <h1 className="text-green font-serif text-[40px] mb-3 max-md:text-3xl max-sm:mb-4">{post.title}</h1>
                <div className="flex justify-between">
                    <div className="mb-2">
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            written by {transformEmail(post.author.email)}
                        </p>
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            on {formatDate(post.createdAt)}
                        </p>
                    </div>
                    <div>
                        {((user && isAuthorOfPost(user.email, post.author.email)) || isAdmin) && (
                            <UpdatePostControls postId={post._id} />
                        )}
                    </div>
                </div>
                {post.summary && (
                    <>
                        <p>{post.summary}</p>
                        <hr className="my-6" />
                    </>
                )}
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
        );
    }

    if (isModeratedPost(post)) {
        return (
            <div className="w-full mb-7">
                <h1 className="text-green font-serif text-[40px] mb-3 max-md:text-3xl max-sm:mb-4">
                    {post.post.title}
                </h1>
                <div className="flex justify-between">
                    <div className="mb-2">
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            written by {transformEmail(post.post.author.email)}
                        </p>
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            on {formatDate(post.createdAt)}
                        </p>
                    </div>
                    <div>
                        {((user && isAuthorOfPost(user.email, post.post.author.email)) || isAdmin) && (
                            <UpdatePostControls postId={post._id} />
                        )}
                    </div>
                </div>
                {post.post.summary && (
                    <>
                        <p>{post.post.summary}</p>
                        <hr className="my-6" />
                    </>
                )}
                <div dangerouslySetInnerHTML={{ __html: post.post.content }}></div>
            </div>
        );
    }
};

export default PostPageLayout;
