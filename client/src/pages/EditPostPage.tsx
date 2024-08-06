import { useNavigate, useParams } from "react-router-dom";
import PostCreateAndUpdateInputs from "../components/PostCreateAndUpdateInputs";
import { postsApi } from "../services/posts.service";
import { IPost, IPostResponse } from "../models/postsApi.models";
import useValidationError from "../hooks/authValidationError";
import { formatDate, transformEmail, transformModeratedPostToPostResponse } from "../utils/post.utils";
import PageWrapperLayout from "./layouts/PageWrapperLayout";
import { useEffect, useState } from "react";

const EditPostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading } = postsApi.useGetPostByIdQuery(id!);
    const [transformedPost, setTransformedTest] = useState<IPostResponse>();
    const [postUpdateTrigger] = postsApi.useUpdatePostMutation();
    const { validationErrors, clearErrors, handleServerError, clearError } = useValidationError();
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setTransformedTest(() => transformModeratedPostToPostResponse(post));
        }
    }, [post, isLoading]);

    const handlePostUpdate = async (updatedPost: IPost) => {
        clearErrors();
        try {
            await postUpdateTrigger({ postId: id!, updatedPost }).unwrap();
            navigate(`/`, { replace: true });
        } catch (error) {
            console.log(error);
            handleServerError(error);
        }
    };

    return (
        <PageWrapperLayout>
            <div className="mb-8 max-sm:mb-5">
                <h1 className="font-serif text-5xl max-sm:text-4xl mb-3">Update Post</h1>
                {!isLoading && transformedPost && (
                    <>
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            written by {transformEmail(transformedPost.author.email)}
                        </p>
                        <p className="font-extralight text-grey text-xl max-sm:text-base">
                            on {formatDate(transformedPost.createdAt)}
                        </p>
                    </>
                )}
            </div>
            <PostCreateAndUpdateInputs
                buttonText="Update"
                onSubmit={handlePostUpdate}
                validationErrors={validationErrors}
                clearError={clearError}
                initialData={transformedPost}
            />
        </PageWrapperLayout>
    );
};

export default EditPostPage;
