import { useNavigate, useParams } from "react-router-dom";
import PostCreateAndUpdateInputs from "../components/PostCreateAndUpdateInputs";
import { postsApi } from "../services/posts.service";
import { IPost } from "../models/postsApi.models";
import useValidationError from "../hooks/authValidationError";
import { formatDate, transformEmail } from "../utils/post.utils";

const EditPostPage = () => {
    const { id } = useParams();
    const { data: post, isLoading } = postsApi.useGetPostByIdQuery(id!);
    const [postUpdateTrigger] = postsApi.useUpdatePostMutation();
    const { validationErrors, clearErrors, handleServerError, clearError } = useValidationError();
    const navigate = useNavigate();

    const handlePostUpdate = async (updatedPost: IPost) => {
        clearErrors();
        try {
            await postUpdateTrigger({ postId: id!, updatedPost }).unwrap();
            navigate("/");
        } catch (error) {
            console.log(error);
            handleServerError(error);
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="max-w-[1000px] w-full max-lg:px-6 max-lg:w-full ">
                <div className="mb-8 max-sm:mb-5">
                    <h1 className="font-serif text-5xl max-sm:text-4xl mb-3">Update Post</h1>
                    {!isLoading && post && (
                        <>
                            <p className="font-extralight text-grey text-xl max-sm:text-base">
                                written by {transformEmail(post.author.email)}
                            </p>
                            <p className="font-extralight text-grey text-xl max-sm:text-base">
                                on {formatDate(post.createdAt)}
                            </p>
                        </>
                    )}
                </div>
                <PostCreateAndUpdateInputs
                    buttonText="Update"
                    onSubmit={handlePostUpdate}
                    validationErrors={validationErrors}
                    clearError={clearError}
                    initialData={post}
                />
            </div>
        </div>
    );
};

export default EditPostPage;
