import UpdatePostControls from "../../components/UpdatePostControls";
import { useAppSelector } from "../../hooks/store.hooks";
import { IModeratedPost, IPostResponse } from "../../models/postsApi.models";
import {
    formatDate,
    isAuthorOfPost,
    transformEmail,
    transformModeratedPostToPostResponse,
} from "../../utils/post.utils";

interface PostPageLayoutProps {
    post: IPostResponse | IModeratedPost;
}

const PostPageLayout = ({ post }: PostPageLayoutProps) => {
    const { user, isAdmin } = useAppSelector((state) => state.userReducer);

    const transformedPost = transformModeratedPostToPostResponse(post);

    return (
        <div className="w-full mb-7">
            <h1 className="text-green font-serif text-[40px] mb-3 max-md:text-3xl max-sm:mb-4">
                {transformedPost.title}
            </h1>
            <div className="flex justify-between">
                <div className="mb-2">
                    <p className="font-extralight text-grey text-xl max-sm:text-base">
                        written by {transformEmail(transformedPost.author.email)}
                    </p>
                    <p className="font-extralight text-grey text-xl max-sm:text-base">
                        on {formatDate(transformedPost.createdAt)}
                    </p>
                </div>
                <div>
                    {((user && isAuthorOfPost(user.email, transformedPost.author.email)) || isAdmin) && (
                        <UpdatePostControls postId={post._id} />
                    )}
                </div>
            </div>
            {transformedPost.summary && (
                <>
                    <p>{transformedPost.summary}</p>
                    <hr className="my-6" />
                </>
            )}
            <div id="quill-custom" dangerouslySetInnerHTML={{ __html: transformedPost.content }}></div>
        </div>
    );
};

export default PostPageLayout;
