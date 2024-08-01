import { useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../services/posts.service";
import { formatDate, isAuthorOfPost, transformEmail } from "../utils/post.utils";
import UpdatePostControls from "../components/UpdatePostControls";
import { useAppSelector } from "../hooks/store.hooks";
import PageWrapperLayout from "./layouts/PageWrapperLayout";
import { useEffect } from "react";

const PostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading } = postsApi.useGetPostByIdQuery(id!);
    const { user, isAdmin } = useAppSelector((state) => state.userReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (!post && !isLoading) {
            navigate("/", { replace: true });
        }
    }, [post]);

    return (
        <PageWrapperLayout>
            {!isLoading && post && (
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
                                <UpdatePostControls postId={id!} />
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
            )}
        </PageWrapperLayout>
    );
};

export default PostPage;
