import { useParams } from "react-router-dom";
import { postsApi } from "../services/posts.service";
import { formatDate, isAuthorOfPost, transformEmail } from "../utils/post.utils";
import UpdatePostControls from "../components/UpdatePostControls";
import { useAppSelector } from "../hooks/store.hooks";

const PostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading } = postsApi.useGetPostByIdQuery(id!);
    const { user, isAdmin } = useAppSelector((state) => state.userReducer);
    return (
        <div className="w-full flex justify-center ">
            {!isLoading && post && (
                <div className="max-w-[1000px] w-full max-lg:px-6 max-lg:w-full py-14">
                    <div className="w-full mb-7">
                        <h1 className="text-green font-serif text-[40px] mb-3 max-md:text-3xl max-sm:mb-4">
                            {post.title}
                        </h1>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-extralight text-grey text-xl max-sm:text-base">
                                    written by {transformEmail(post.author.email)}
                                </p>
                                <p className="font-extralight text-grey text-xl max-sm:text-base">
                                    on {formatDate(post.createdAt)}
                                </p>
                            </div>
                            <div>
                                {((user && isAuthorOfPost(user.email, post.author.email)) || isAdmin) && (
                                    <UpdatePostControls postId={id!} />
                                )}
                            </div>
                        </div>
                    </div>
                    {post.summary && (
                        <>
                            <p>{post.summary}</p>
                            <hr className="my-6"></hr>
                        </>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
            )}
        </div>
    );
};

export default PostPage;
